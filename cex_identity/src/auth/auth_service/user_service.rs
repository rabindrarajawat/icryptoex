use crate::auth::auth_dto::user_dto::{NewUser, User, UserResponse};
use crate::schema::users::dsl::*;
use actix_web::{web, HttpResponse};
use bcrypt::{hash, verify, DEFAULT_COST};
use chrono::Utc;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager, PooledConnection};
use jsonwebtoken::{encode, Header};
use serde::Deserialize;
use serde::Serialize;
use serde_json::json;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct SignupData {
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub country: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    iat: i64,
    exp: i64,
    name: String,
}

#[derive(Deserialize)]
pub struct UpdateUserData {
    pub name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub country: Option<String>,
}

// Helper function to get the database connection
fn get_db_connection(
    pool: &web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
) -> PooledConnection<ConnectionManager<PgConnection>> {
    pool.get().expect("couldn't get db connection from pool")
}

pub async fn signup(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
    signup_data: web::Json<SignupData>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let existing_user = users
        .filter(email.eq(&signup_data.email))
        .first::<User>(&mut conn)
        .optional()
        .expect("Error checking existing user");

    if existing_user.is_some() {
        let response_body = json!({
            "message": "Email already in use"
        });
        return HttpResponse::BadRequest().json(response_body);
    }

    let hashed_password = hash(&signup_data.password, DEFAULT_COST).unwrap();
    let new_user = NewUser {
        name: &signup_data.name,
        email: &signup_data.email,
        phone_number: &signup_data.phone_number,
        country: &signup_data.country,
        password: &hashed_password,
    };

    let user = diesel::insert_into(users)
        .values(&new_user)
        .get_result::<User>(&mut conn)
        .expect("Error saving new user");

    let response_body = json!({
        "message": "User created successfully",
        "id": user.id
    });

    HttpResponse::Ok().json(response_body)
}

pub async fn login(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
    login_data: web::Json<LoginData>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let user = users
        .filter(email.eq(&login_data.email))
        .first::<User>(&mut conn)
        .unwrap();

    if verify(&login_data.password, &user.password).unwrap() {
        let claims = Claims {
            sub: user.id.to_string(),
            iat: Utc::now().timestamp(),
            exp: Utc::now().timestamp() + 28800,
            name: user.name,
        };
        let token = encode(
            &Header::default(),
            &claims,
            &jsonwebtoken::EncodingKey::from_secret(
                "GB2DUFUKRXUU6XORCEWMXZPTXVI7O3B7HMCSI7ZCVALB6LPHK2SMG663".as_ref(),
            ),
        )
        .unwrap();

        HttpResponse::Ok().json(token)
    } else {
        let response_body = json!({
            "message": "Unauthorized: Incorrect email or password"
        });
        HttpResponse::Unauthorized().json(response_body)
    }
}

pub async fn get_all_users(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let result = users.load::<User>(&mut conn).expect("Error loading users");

    let response: Vec<UserResponse> = result
        .into_iter()
        .map(|user| UserResponse {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            country: user.country,
        })
        .collect();

    HttpResponse::Ok().json(response)
}

pub async fn get_user_by_id(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let result = users
        .find(*user_id)
        .first::<User>(&mut conn)
        .optional()
        .expect("Error loading user");

    match result {
        Some(user) => {
            let response = UserResponse {
                id: user.id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                country: user.country,
            };
            HttpResponse::Ok().json(response)
        }
        None => HttpResponse::NotFound().json(json!({"message": "User not found"})),
    }
}

pub async fn update_user(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
    user_id: web::Path<Uuid>,
    update_data: web::Json<UpdateUserData>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let user_id = user_id.into_inner();

    let existing_user = users
        .filter(id.eq(user_id))
        .first::<User>(&mut conn)
        .optional();

    if let Ok(Some(_)) = existing_user {
        let updated_user = diesel::update(users.filter(id.eq(user_id)))
            .set((
                update_data.name.as_ref().map(|n| name.eq(n)),
                update_data.email.as_ref().map(|e| email.eq(e)),
                update_data
                    .phone_number
                    .as_ref()
                    .map(|p| phone_number.eq(p)),
                update_data.country.as_ref().map(|c| country.eq(c)),
            ))
            .get_result::<User>(&mut conn)
            .unwrap();

        let response_body = json!({
            "message": "User updated successfully",
            "user id": updated_user.id,
        });

        HttpResponse::Ok().json(response_body)
    } else {
        let response_body = json!({
            "message": "User not found"
        });

        HttpResponse::NotFound().json(response_body)
    }
}

pub async fn delete_user(
    pool: web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let user_id = user_id.into_inner();

    let user_exists = users
        .filter(id.eq(user_id))
        .first::<User>(&mut conn)
        .optional()
        .expect("Error loading user");

    match user_exists {
        Some(_) => {
            diesel::delete(users.filter(id.eq(user_id)))
                .execute(&mut conn)
                .expect("Error deleting user");

            let response_body = json!({
                "message": "User deleted successfully"
            });

            HttpResponse::Ok().json(response_body)
        }
        None => {
            let response_body = json!({
                "message": "No user found with the given ID"
            });

            HttpResponse::NotFound().json(response_body)
        }
    }
}

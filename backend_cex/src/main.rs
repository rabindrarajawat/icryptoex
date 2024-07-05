

// use actix_cors::Cors;
// use actix_web::{middleware, web, App, HttpServer};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
// use dotenv::dotenv;
// use std::env;
// use diesel::RunQueryDsl;

// #[allow(dead_code)]
// mod auth;
// mod orders;
// mod schema;

// async fn init_database(pool: &web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>) {
//     let conn = &mut pool.get().expect("Failed to get DB connection from pool");
//     diesel::sql_query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
//         .execute(conn)
//         .expect("Error creating uuid-ossp extension");
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     dotenv().ok();
//     env_logger::init();

//     let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
//     let manager = ConnectionManager::<PgConnection>::new(database_url);
//     let pool = r2d2::Pool::builder()
//         .build(manager)
//         .expect("Failed to create pool.");

//     let pool_data = web::Data::new(pool.clone());
//     init_database(&pool_data).await;

//     let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());

//     HttpServer::new(move || {
//         let cors = Cors::default()
//             .allow_any_origin()
//             .allow_any_method()
//             .allow_any_header()
//             .max_age(3600);

//         App::new()
//             .app_data(web::Data::new(pool.clone()))
//             .wrap(middleware::Logger::default())
//             .wrap(cors) // Add CORS middleware here
//             .configure(auth::auth_controller::user_controller::auth_routes)
//             .configure(orders::order_controller::order_controller::order_routes)
//     })
//     .bind(bind_address)?
//     .run()
//     .await
// }






// gaurd aplied below 

// use actix_web_httpauth::middleware::HttpAuthentication;
// use actix_cors::Cors;
// use actix_web::{middleware, web, App, HttpServer};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
// use dotenv::dotenv;
// use std::env;
// use diesel::RunQueryDsl;
// use crate::auth::auth_service::auth_middleware;

// #[allow(dead_code)]
// mod auth;
// mod orders;
// mod schema;

// pub struct AppState {
//     pool: r2d2::Pool<ConnectionManager<PgConnection>>,
//     jwt_secret: String,
// }

// async fn init_database(state: &web::Data<AppState>) {
//     let conn = &mut state.pool.get().expect("Failed to get DB connection from pool");
//     diesel::sql_query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
//         .execute(conn)
//         .expect("Error creating uuid-ossp extension");
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     dotenv().ok();
//     env_logger::init();

//     let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
//     let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    
//     let manager = ConnectionManager::<PgConnection>::new(database_url);
//     let pool = r2d2::Pool::builder()
//         .build(manager)
//         .expect("Failed to create pool.");

//     let pool_data = web::Data::new(AppState {
//         pool: pool.clone(),
//         jwt_secret: jwt_secret.clone(),
//     });
    
//     init_database(&pool_data).await;

//     let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());

//     HttpServer::new(move || {
//         let auth1 = HttpAuthentication::bearer(auth_middleware::validator);
        
//         let cors = Cors::default()
//             .allow_any_origin()
//             .allow_any_method()
//             .allow_any_header()
//             .max_age(3600);

//         App::new()
//             .app_data(web::Data::new(AppState {
//                 pool: pool.clone(),
//                 jwt_secret: jwt_secret.clone(),
//             }))
//             .wrap(middleware::Logger::default())
//             .wrap(cors)
//             // .service(
//             //     web::scope("/api")
//                     .wrap(auth1)
//                     .configure(orders::order_controller::order_controller::order_routes)
//             // )
//             .configure(auth::auth_controller::user_controller::auth_routes)
//     })
//     .bind(bind_address)?
//     .run()
//     .await
// }

















// src/main.rs
use actix_web_httpauth::middleware::HttpAuthentication;
use actix_cors::Cors;
use actix_web::{middleware, web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use std::env;
use diesel::RunQueryDsl;
use crate::auth::auth_service::auth_middleware;
use crate::orders::order_controller::order_controller::order_routes;

#[allow(dead_code)]
mod auth;
mod orders;
mod schema;

pub struct AppState {
    pool: r2d2::Pool<ConnectionManager<PgConnection>>,
    jwt_secret: String,
}

async fn init_database(state: &web::Data<AppState>) {
    let conn = &mut state.pool.get().expect("Failed to get DB connection from pool");
    diesel::sql_query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
        .execute(conn)
        .expect("Error creating uuid-ossp extension");
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let pool_data = web::Data::new(AppState {
        pool: pool.clone(),
        jwt_secret: jwt_secret.clone(),
    });
    
    init_database(&pool_data).await;

    let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());

    HttpServer::new(move || {
        let auth1 = HttpAuthentication::bearer(auth_middleware::validator);
        
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(AppState {
                pool: pool.clone(),
                jwt_secret: jwt_secret.clone(),
            }))
            .wrap(middleware::Logger::default())
            .wrap(cors)
            // Public routes
            .configure(auth::auth_controller::user_controller::auth_routes) // Register auth routes directly without authentication
            // Protected routes
            .service(
                web::scope("/api")
                    .wrap(auth1) // Apply authentication middleware to routes that need it
                    .configure(order_routes) // Ensure this is the correct path to order_routes
            )
    })
    .bind(bind_address)?
    .run()
    .await
}

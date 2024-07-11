// use actix_cors::Cors;
// use actix_web::{middleware, web, App, HttpServer};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
// use diesel::RunQueryDsl;
// use dotenv::dotenv;
// use std::env;

// mod auth_guard;
// mod orders;
// mod schema;
// mod sell;
// use crate::auth_guard::auth_guard::AuthGuard;
// async fn init_database(pool: &web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>) {
//     let conn = &mut pool.get().expect("Failed to get DB connection from pool");
//     diesel::sql_query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
//         .execute(conn)
//         .expect("Error creating uuid-ossp extension");
// }
// // ... (rest of your imports and init_database function)

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

//     let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8001".to_string());
//     let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

//     HttpServer::new(move || {
//         let cors = Cors::default()
//             .allow_any_origin()
//             .allow_any_method()
//             .allow_any_header()
//             .max_age(3600);

//         App::new()
//             .app_data(web::Data::new(pool.clone()))
//             .wrap(middleware::Logger::default())
//             .wrap(AuthGuard::new(jwt_secret.clone()))
//             .wrap(cors)
//             .configure(orders::order_controller::order_controller::order_routes)
//             .configure(sell::sell_controller::sell_controller::sell_routes)
//     })
//     .bind(bind_address)?
//     .run()
//     .await
// }















// use actix_web::{web, App, HttpServer, HttpResponse, Responder};
// use cex_common::{AuthMiddleware, Claims};
// use std::sync::Arc;
// use actix_web::dev::Service;
// use actix_web::HttpMessage;

// async fn protected_route(claims: web::ReqData<Claims>) -> impl Responder {
//     HttpResponse::Ok().json(format!("Hello, user {}!", claims.into_inner().sub))
// }
// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     let identity_client = reqwest::Client::new();
//     let auth_middleware = Arc::new(AuthMiddleware::new(identity_client));

//     HttpServer::new(move || {
//         App::new()
//             .app_data(web::Data::new(auth_middleware.clone()))
//             .service(
//                 web::scope("")
//                     .wrap_fn(|req, srv| {
//                         let auth_middleware = req.app_data::<web::Data<Arc<AuthMiddleware>>>().unwrap().clone();
//                         async move {
//                             match auth_middleware.validate_request(&req).await {
//                                 Ok(claims) => {
//                                     req.extensions_mut().insert(claims);
//                                     srv.call(req).await
//                                 }
//                                 Err(e) => Err(e),
//                             }
//                         }
//                     })
//                     .route("/protected", web::get().to(protected_route))
//             )
//     })
//     .bind("127.0.0.1:8081")?
//     .run()
//     .await
// }










use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use cex_common::{AuthMiddleware, Claims};
use std::sync::Arc;
use actix_web::dev::Service;
use actix_web::HttpMessage;
use actix_web::HttpRequest;

 async fn protected_route(req:HttpRequest) -> impl Responder {
    if let Some(claims) = req.extensions().get::<Claims>() {
        HttpResponse::Ok().json(format!("Hello, user {}!", claims.sub))
    } else {
        HttpResponse::InternalServerError().json("Failed to retrieve claims")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let identity_client = reqwest::Client::new();
    let auth_middleware = Arc::new(AuthMiddleware::new(identity_client));

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(auth_middleware.clone()))
            .service(
                web::scope("")
                    .wrap_fn(|req, srv| {
                        let auth_middleware = req.app_data::<web::Data<Arc<AuthMiddleware>>>().unwrap().clone();
                        async move {
                            match auth_middleware.validate_request(&req).await {
                                Ok(claims) => {
                                    req.extensions_mut().insert(claims);
                                    srv.call(req).await
                                }
                                Err(e) => Err(e),
                            }
                        }
                    })
                    .route("/protected", web::get().to(protected_route))
            )
    })
    .bind("127.0.0.1:8081")?
    .run()
    .await
}
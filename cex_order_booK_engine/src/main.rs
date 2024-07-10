//  use actix_web::{middleware, web, App, HttpServer};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
// use dotenv::dotenv;
// use std::env;
// use diesel::RunQueryDsl;

// #[allow(dead_code)]
// // mod auth;
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
//         // let cors = Cors::default()
//         //     .allow_any_origin()
//         //     .allow_any_method()
//         //     .allow_any_header()
//         //     .max_age(3600);

//         App::new()
//             .app_data(web::Data::new(pool.clone()))
//             .wrap(middleware::Logger::default())
//             // .wrap(cors) // Add CORS middleware here
//             // .configure(auth::auth_controller::user_controller::auth_routes)
//             .configure(orders::order_controller::order_controller::order_routes)
//     })
//     .bind(bind_address)?
//     .run()
//     .await
// }









// main.rs

use actix_web::{middleware, web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use std::env;
use diesel::RunQueryDsl;
 
mod auth_guard;
mod orders;
mod schema;
mod sell;
use crate::auth_guard::auth_guard::AuthGuard;
async fn init_database(pool: &web::Data<r2d2::Pool<ConnectionManager<PgConnection>>>) {
    let conn = &mut pool.get().expect("Failed to get DB connection from pool");
    diesel::sql_query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
        .execute(conn)
        .expect("Error creating uuid-ossp extension");
}
// ... (rest of your imports and init_database function)

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let pool_data = web::Data::new(pool.clone());
    init_database(&pool_data).await;

    let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8001".to_string());
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .wrap(AuthGuard::new(jwt_secret.clone()))
            .configure(orders::order_controller::order_controller::order_routes)
            .configure(sell::sell_controller::sell_controller::sell_routes)
    })
    .bind(bind_address)?
    .run()
    .await
}
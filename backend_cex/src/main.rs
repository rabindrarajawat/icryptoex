

use actix_web::{middleware, web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use std::env;
// use crate::auth::auth_routes; // Import the auth_routes function from the auth module

#[allow(dead_code)]
mod auth;
mod orders;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let bind_address = env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".to_string());

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            // .configure(auth::auth_routes) 
            .configure(auth::auth_controller::user_controller::auth_routes)
            .configure(orders::order_controller::order_controller::order_routes)
    })
    .bind(bind_address)?
    .run()
    .await
}

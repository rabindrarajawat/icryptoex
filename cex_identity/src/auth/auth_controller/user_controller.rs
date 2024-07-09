use crate::auth::auth_service::user_service::{get_all_users, get_user_by_id, delete_user, login, signup, update_user};
use actix_web::web;

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.route("/signup", web::post().to(signup))
        .route("/login", web::post().to(login))
        .route("/users", web::get().to(get_all_users))
        .route("/users/{id}", web::get().to(get_user_by_id))
        .route("/users/{user_id}", web::put().to(update_user))
        .route("/users/{user_id}", web::delete().to(delete_user));
}



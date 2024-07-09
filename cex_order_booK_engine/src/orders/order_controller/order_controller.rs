use crate::orders::order_services::order_service::{create_order, get_all_orders};
use actix_web::web;

pub fn order_routes(cfg: &mut web::ServiceConfig) {
    cfg.route("/orders", web::post().to(create_order))
       .route("/orders", web::get().to(get_all_orders));
 }
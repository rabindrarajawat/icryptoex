use crate::sell::sell_service::sell_service::{make_sell,get_all_sell};

use actix_web::web;

pub fn sell_routes(cfg : &mut web::ServiceConfig){
    cfg.route("/sell", web::post().to(make_sell))
    .route("/getsell", web::get().to(get_all_sell));
}
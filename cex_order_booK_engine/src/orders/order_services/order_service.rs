use crate::orders::order_dto::order_dto::{NewOrder, Order, OrderResponse};
use crate::schema::order_book::dsl::*;
use actix_web::{web, HttpResponse};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use serde_json::json;
 
type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

fn get_db_connection(pool: &web::Data<DbPool>) -> r2d2::PooledConnection<ConnectionManager<PgConnection>> {
    pool.get().expect("couldn't get db connection from pool")
}

pub async fn create_order(
    pool: web::Data<DbPool>,
    new_order: web::Json<NewOrder>,
) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let result = diesel::insert_into(order_book)
        .values(&*new_order)
        .get_result::<Order>(&mut conn);

    match result {
        Ok(order) => {
            let response_body = json!({
                "message": "Order created successfully",
                "id": order.id
            });
            HttpResponse::Created().json(response_body)
        }
        Err(_) => {
            let response_body = json!({
                "message": "Error creating order"
            });
            HttpResponse::InternalServerError().json(response_body)
        }
    }
}

pub async fn get_all_orders(pool: web::Data<DbPool>) -> HttpResponse {
    let mut conn = get_db_connection(&pool);

    let result = order_book.load::<Order>(&mut conn);

    match result {
        Ok(order_list) => {
            let response: Vec<OrderResponse> = order_list
                .into_iter()
                .map(|order| OrderResponse {
                    id: order.id,
                    order_price: order.order_price,
                    order_value: order.order_value,
                    order_quantity: order.order_quantity,
                })
                .collect();
            HttpResponse::Ok().json(response)
        }
        Err(_) => {
            let response_body = json!({
                "message": "Error fetching orders"
            });
            HttpResponse::InternalServerError().json(response_body)
        }
    }
}

// pub async fn get_order_by_id(
//     pool: web::Data<DbPool>,
//     order_id: web::Path<Uuid>,
// ) -> HttpResponse {
//     let mut conn = get_db_connection(&pool);

//     let result = orders.find(*order_id).first::<Order>(&mut conn);

//     match result {
//         Ok(order) => {
//             let response = OrderResponse {
//                 id: order.id,
//                 order_price: order.order_price,
//                 order_value: order.order_value,
//                 order_quantity: order.order_quantity,
//             };
//             HttpResponse::Ok().json(response)
//         }
//         Err(_) => {
//             let response_body = json!({
//                 "message": "Order not found"
//             });
//             HttpResponse::NotFound().json(response_body)
//         }
//     }
// }
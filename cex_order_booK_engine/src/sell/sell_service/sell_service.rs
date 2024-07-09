
use crate::sell::sell_dto::sell_dto::{NewSell, Sell, SellResponse};
use crate::schema::sell_data::dsl::*;
use actix_web::{web,HttpResponse};
use diesel::prelude::*;
use diesel::r2d2::{self,ConnectionManager};
use serde_json::json;
type DbPool=r2d2::Pool<ConnectionManager<PgConnection>>;

fn get_db_connection(pool :&web::Data<DbPool>)->r2d2::PooledConnection<ConnectionManager<PgConnection>>{
    pool.get().expect("coudn't get db connection from pool")
}

pub async fn make_sell(pool:web::Data<DbPool>,new_sell:web::Json<NewSell>,)-> HttpResponse{
let mut conn = get_db_connection(&pool);

let result = diesel::insert_into(sell_data)
.values(&*new_sell)
.get_result::<Sell>(&mut conn);

match result {
    Ok(sell)=>{
        let response_body=json!({"message" :"sell is completed",
        "id":sell.id});
        HttpResponse::Created().json(response_body)
    }

    Err(_)=>{
        let response_body=json!({"message":"Error in making the sell"});
        HttpResponse::InternalServerError().json(response_body)
    }
}
}


pub async fn get_all_sell(pool:web::Data<DbPool>)->HttpResponse{
    let mut conn=get_db_connection(&pool);

    let result = sell_data.load::<Sell>(&mut conn);

    match result {
        Ok(sell_list)=>{
            let response:Vec<SellResponse>=sell_list.into_iter().map(|sell|SellResponse{
                id:sell.id,
                sell_price:sell.sell_price,
                sell_value:sell.sell_value,
                sell_quantity:sell.sell_quantity
            }).collect();
            HttpResponse::Ok().json(response)
        }
        Err(_)=>{
            let response_body=json!({"message":"Error fetching sell"});
            HttpResponse::InternalServerError().json(response_body)
        }
    }
}

// use diesel ::{Insertable,Queryable,QueryableByName};
// use serde::{Deserialize, Serialize};
// use crate :: schema::orders;

// #[derive(Queryable,Serialize,Deserialize,Debug,QueryableByName)]
// #[table_name = "orders"]
// pub struct Order{
//     pub id:i32,
//     pub order_price:i32,
//     pub order_value:i32,
//     pub order_quantity:i32,
// }

// #[derive(Insertable)]
// #[diesel(table_name = orders)]
// pub struct NewOrder{
//     pub order_price:i32,
//     pub order_value:i32,
//     pub order_quantity:i32,
// }




use crate::schema::orders;
use bigdecimal::BigDecimal;
use diesel::{Insertable, Queryable, QueryableByName};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize, Debug, QueryableByName)]
#[table_name = "orders"]
pub struct Order {
    pub id: i32,
    pub order_price: BigDecimal,
    pub order_value: BigDecimal,
    pub order_quantity: BigDecimal,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = orders)]
pub struct NewOrder {
    pub order_price: BigDecimal,
    pub order_value: BigDecimal,
    pub order_quantity: BigDecimal,
}

#[derive(Serialize, Deserialize)]
pub struct OrderResponse {
    pub id: i32,
    pub order_price: BigDecimal,
    pub order_value: BigDecimal,
    pub order_quantity: BigDecimal,
}
use crate::schema::orders;
use bigdecimal::BigDecimal;
use diesel::{Insertable, Queryable, QueryableByName};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Serialize, Deserialize, Debug, QueryableByName)]
#[diesel(table_name = orders)]
pub struct Order {
    pub id: Uuid,
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
    pub id: Uuid,
    pub order_price: BigDecimal,
    pub order_value: BigDecimal,
    pub order_quantity: BigDecimal,
}

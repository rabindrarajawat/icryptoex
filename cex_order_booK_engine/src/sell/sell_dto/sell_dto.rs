// use  crate::schema::sell_data;
// use bigdecimal::BigDecimal;
// use diesel::{Insertable,Queryable,QueryableByName};
// use serde::{Serialize,Deserialize};
// use uuid::Uuid;

// #[derive(Queryable,Serialize,Deserialize,Debug, QueryableByName)]
// #[diesel(table_name = sell_data)]
// pub struct Sell{
//     pub id :Uuid,
//     pub sell_price:BigDecimal,
//     pub sell_value:BigDecimal,
//     pub sell_quantity:BigDecimal,
// }

// #[derive(Insertable,Deserialize)]
// #[derive(table_name = sell_data)]
// pub struct NewSell {
//     pub sell_price:BigDecimal,
//     pub sell_value:BigDecimal,
//     pub sell_quantity:BigDecimal,
// }

// #[derive(Serialize,Deserialize)]
// pub struct SellResponse{
//     pub id:Uuid,
//     pub sell_price:BigDecimal,
//     pub sell_value:BigDecimal,
//     pub sell_quantity:BigDecimal,
// }






use crate::schema::sell_data;
use bigdecimal::BigDecimal;
use diesel::{Insertable, Queryable, QueryableByName};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Queryable, Serialize, Deserialize, Debug, QueryableByName)]
#[diesel(table_name = sell_data)]
pub struct Sell {
    pub id: Uuid,
    pub sell_price: BigDecimal,
    pub sell_value: BigDecimal,
    pub sell_quantity: BigDecimal,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = sell_data)]
pub struct NewSell {
    pub sell_price: BigDecimal,
    pub sell_value: BigDecimal,
    pub sell_quantity: BigDecimal,
}

#[derive(Serialize, Deserialize)]
pub struct SellResponse {
    pub id: Uuid,
    pub sell_price: BigDecimal,
    pub sell_value: BigDecimal,
    pub sell_quantity: BigDecimal,
}

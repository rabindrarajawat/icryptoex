// models.rs
use crate::schema::users;
use diesel::{Insertable, Queryable, QueryableByName};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize, Debug, QueryableByName)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub country: String,
    pub password: String,
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub name: &'a str,
    pub email: &'a str,
    pub phone_number: &'a str,
    pub country: &'a str,
    pub password: &'a str,
}

#[derive(Serialize, Deserialize)]
pub struct UserResponse {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub country: String,
}

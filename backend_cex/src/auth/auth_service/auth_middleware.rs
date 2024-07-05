// auth/auth_middleware.rs

use actix_web::{
    dev::ServiceRequest, error::ErrorUnauthorized, Error, HttpMessage,
};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use jsonwebtoken::{decode, DecodingKey, Validation};

use crate::auth::auth_dto::user_dto::Claims;

pub async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    let config = req
        .app_data::<actix_web::web::Data<crate::AppState>>()
        .expect("AppState not found");

    let token = credentials.token();
    
    let key = config.jwt_secret.as_bytes();
    match decode::<Claims>(token, &DecodingKey::from_secret(key), &Validation::default()) {
        Ok(_claims) => {
            req.extensions_mut().insert(token.to_string());
            Ok(req)
        }
        Err(_) => Err(ErrorUnauthorized("Invalid token")),
    }
}
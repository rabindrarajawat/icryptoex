use actix_web::error::ErrorUnauthorized;
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std:: sync::Arc;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub iat: i64,
    pub exp: i64,
    pub name: String,
 }

pub struct JwtValidator {
    jwt_secret: Arc<String>,
}

impl JwtValidator {
    pub fn new(jwt_secret: String) -> Self {
        Self {
            jwt_secret: Arc::new(jwt_secret),
        }
    }

    pub fn validate_token(&self, token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_bytes()),
            &Validation::new(Algorithm::HS256),
        )?;

        Ok(token_data.claims)
    }
}

pub struct AuthMiddleware {
    client: Client,
}

impl AuthMiddleware {
    pub fn new(client: Client) -> Self {
        Self { client }
    }

    pub async fn validate_request(
        &self,
        req: &actix_web::dev::ServiceRequest,
    ) -> Result<Claims, actix_web::Error> {
        if let Some(auth_header) = req.headers().get("Authorization") {
            let auth_str = auth_header
                .to_str()
                .map_err(|_| ErrorUnauthorized("Invalid authorization header"))?;
            if !auth_str.starts_with("Bearer ") {
                return Err(ErrorUnauthorized("Invalid authorization header"));
            }
            let token = &auth_str[7..];

            // Make a request to cex_identity to validate the token
            let response = self
                .client
                .post("http://localhost:8080/validate_token")
                .json(&serde_json::json!({"token": token}))
                .send()
                .await
                .map_err(|_| ErrorUnauthorized("Failed to validate token"))?;

            if response.status().is_success() {
                let claims: Claims = response
                    .json()
                    .await
                    .map_err(|_| ErrorUnauthorized("Invalid token response"))?;
                Ok(claims)
            } else {
                Err(ErrorUnauthorized("Invalid token"))
            }
        } else {
            Err(ErrorUnauthorized("Missing authorization header"))
        }
    }
}

// use actix_web::dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform};
// use actix_web::error::ErrorUnauthorized;
// use actix_web::{Error, HttpMessage};
// use futures::future::{ready, Ready};
// use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
// use serde::{Deserialize, Serialize};
// use std::future::Future;
// use std::pin::Pin;
// use std::sync::Arc;

// #[derive(Debug, Serialize, Deserialize)]
// pub struct Claims {
//         sub: String,
//         iat: i64,
//         name: String,
//     }

// pub struct AuthGuard {
//     pub jwt_secret: Arc<String>,
// }

// impl AuthGuard {
//     pub fn new(jwt_secret: String) -> Self {
//         Self { jwt_secret: Arc::new(jwt_secret) }
//     }
// }

// impl<S, B> Transform<S, ServiceRequest> for AuthGuard
// where
//     S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
//     S::Future: 'static,
//     B: 'static,
// {
//     type Response = ServiceResponse<B>;
//     type Error = Error;
//     type InitError = ();
//     type Transform = AuthGuardMiddleware<S>;
//     type Future = Ready<Result<Self::Transform, Self::InitError>>;

//     fn new_transform(&self, service: S) -> Self::Future {
//         ready(Ok(AuthGuardMiddleware {
//             service,
//             jwt_secret: self.jwt_secret.clone(),
//         }))
//     }
// }

// pub struct AuthGuardMiddleware<S> {
//     service: S,
//     jwt_secret: Arc<String>,
// }

// impl<S, B> Service<ServiceRequest> for AuthGuardMiddleware<S>
// where
//     S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
//     S::Future: 'static,
//     B: 'static,
// {
//     type Response = ServiceResponse<B>;
//     type Error = Error;
//     type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>>>>;

//     forward_ready!(service);

//     fn call(&self, req: ServiceRequest) -> Self::Future {
//         println!("Received headers {:?}", req.headers());
//         let jwt_secret = self.jwt_secret.clone();
//         let fut = self.service.call(req);

//         Box::pin(async move {
//             let  res = fut.await?;

//             if let Some(auth_header) = res.headers().get("Authorization") {
//                 let auth_str = auth_header.to_str().map_err(|_| ErrorUnauthorized("Invalid authorization header"))?;
//                 if !auth_str.starts_with("Bearer ") {
//                     return Err(ErrorUnauthorized("Invalid authorization header"));
//                 }
//                 let token = &auth_str[7..];

//                 // Decode and validate the token
//                 let token_data = decode::<Claims>(
//                     token,
//                     &DecodingKey::from_secret(jwt_secret.as_bytes()),
//                     &Validation::new(Algorithm::HS256)
//                 ).map_err(|_| ErrorUnauthorized("Invalid token"))?;

//                 // Add claims to request extensions
//                 res.request().extensions_mut().insert(token_data.claims);
//             } else {
//                 return Err(ErrorUnauthorized("Missing authorization header"));
//             }

//             Ok(res)
//         })
//     }

// }

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    iat: i64,
    name: String,
}

use actix_web::body::MessageBody;
use actix_web::dev::{Service, ServiceRequest, ServiceResponse, Transform};
use actix_web::error::ErrorUnauthorized;
use actix_web::{Error, HttpMessage};
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use serde::Deserialize;
use serde::Serialize;
use std::future::{ready, Future, Ready};
use std::pin::Pin;
use std::rc::Rc;
use std::task::{Context, Poll};
pub struct AuthGuard {
    jwt_secret: Rc<String>,
}

impl AuthGuard {
    pub fn new(jwt_secret: String) -> Self {
        Self {
            jwt_secret: Rc::new(jwt_secret),
        }
    }
}

impl<S, B> Transform<S, ServiceRequest> for AuthGuard
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static,
    B: MessageBody + 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = AuthGuardMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AuthGuardMiddleware {
            service: Rc::new(service),
            jwt_secret: self.jwt_secret.clone(),
        }))
    }
}

pub struct AuthGuardMiddleware<S> {
    service: Rc<S>,
    jwt_secret: Rc<String>,
}

impl<S, B> Service<ServiceRequest> for AuthGuardMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static,
    B: MessageBody + 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>>>>;

    fn poll_ready(&self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let service = self.service.clone();
        let jwt_secret = self.jwt_secret.clone();

        Box::pin(async move {
            let (http_req, payload) = req.into_parts();

            // Check for Authorization header
            if let Some(auth_header) = http_req.headers().get("Authorization") {
                let auth_str = auth_header
                    .to_str()
                    .map_err(|_| ErrorUnauthorized("Invalid authorization header"))?;
                if !auth_str.starts_with("Bearer ") {
                    return Err(ErrorUnauthorized("Invalid authorization header"));
                }
                let token = &auth_str[7..];

                // Decode and validate the token
                let token_data = decode::<Claims>(
                    token,
                    &DecodingKey::from_secret(jwt_secret.as_bytes()),
                    &Validation::new(Algorithm::HS256),
                )
                .map_err(|_| ErrorUnauthorized("Invalid token"))?;

                // Add claims to request extensions
                http_req.extensions_mut().insert(token_data.claims);

                // Reconstruct ServiceRequest and call the next service
                let req = ServiceRequest::from_parts(http_req, payload);
                service.call(req).await
            } else {
                Err(ErrorUnauthorized("Missing authorization header"))
            }
        })
    }
}

// @generated automatically by Diesel CLI.

diesel::table! {
    employees (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        department -> Varchar,
        salary -> Int4,
        age -> Int4,
    }
}

diesel::table! {
    orders (id) {
        id -> Uuid,
        order_price -> Numeric,
        order_value -> Numeric,
        order_quantity -> Numeric,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 20]
        phone_number -> Varchar,
        #[max_length = 100]
        country -> Varchar,
        #[max_length = 255]
        password -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    employees,
    orders,
    users,
);

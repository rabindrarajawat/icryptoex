// @generated automatically by Diesel CLI.

diesel::table! {
    order_book (id) {
        id -> Uuid,
        order_price -> Numeric,
        order_value -> Numeric,
        order_quantity -> Numeric,
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
    sell_data (id) {
        id -> Uuid,
        sell_price -> Numeric,
        sell_value -> Numeric,
        sell_quantity -> Numeric,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
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
    order_book,
    orders,
    sell_data,
    users,
);

-- Your SQL goes here
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_price DECIMAL NOT NULL,
    order_value DECIMAL NOT NULL,
    order_quantity DECIMAL NOT NULL
);

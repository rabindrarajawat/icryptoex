-- Your SQL goes here
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_price NUMERIC NOT NULL,
    order_value NUMERIC NOT NULL,
    order_quantity NUMERIC NOT NULL
);
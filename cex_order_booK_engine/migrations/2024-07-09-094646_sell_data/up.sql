-- Your SQL goes here
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the orders table
CREATE TABLE sell_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sell_price NUMERIC NOT NULL,
    sell_value NUMERIC NOT NULL,
    sell_quantity NUMERIC NOT NULL
);
-- Your SQL goes here
ALTER TABLE users 
ALTER COLUMN name TYPE VARCHAR(255),
ALTER COLUMN email TYPE VARCHAR(255),
ALTER COLUMN phone_number TYPE VARCHAR(20),
ALTER COLUMN country TYPE VARCHAR(100),
ALTER COLUMN password TYPE VARCHAR(255);
-- This file should undo anything in `up.sql`
-- Drop the orders table
DROP TABLE orders;

-- Optionally, disable the UUID extension if it's no longer needed
-- DROP EXTENSION IF EXISTS "uuid-ossp";
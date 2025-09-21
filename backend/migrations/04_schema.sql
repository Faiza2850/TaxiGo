-- +migrate Up
-- First, drop the existing cards table if it exists
DROP TABLE IF EXISTS public.cards;
-- Drop the enum type if it exists
DROP TYPE IF EXISTS card_type_enum;
-- Define the enum type for card_type
CREATE TYPE card_type_enum AS ENUM ('Visa', 'MasterCard', 'Amex', 'Discover');
-- Now create the new cards table using the updated schema
CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,               -- Auto-incrementing card ID
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Reference to the user
    stripe_token VARCHAR(255) NOT NULL,       -- Store Stripe token
    last4 VARCHAR(4) NOT NULL,                -- Last 4 digits of the card number
    exp_month VARCHAR(2) NOT NULL,            -- Expiration month
    exp_year VARCHAR(4) NOT NULL,             -- Expiration year
    cardholder_name VARCHAR(100),             -- Cardholder's name from the user
    card_brand VARCHAR(50) NOT NULL,          -- Card brand
    first_name VARCHAR(100) NOT NULL,         -- User's first name
    last_name VARCHAR(100) NOT NULL,          -- User's last name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP                       -- Soft delete field
);
ALTER TABLE public.locations
ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.bookings
DROP COLUMN booking_date ;
-- +migrate Down
-- Drop the cards table first
DROP TABLE IF EXISTS public.cards;
-- Then, drop the enum type
DROP TYPE IF EXISTS card_type_enum;
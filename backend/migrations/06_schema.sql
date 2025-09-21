-- +migrate Up

-- Add the customer_id column to the cards table
ALTER TABLE public.cards
ADD COLUMN customer_id VARCHAR(255) NOT NULL;
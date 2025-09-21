-- +migrate Up

-- Add the card_id and receipt_url columns to the payments table
ALTER TABLE public.payments
ADD COLUMN card_id INT REFERENCES cards(card_id) ON DELETE CASCADE,
ADD COLUMN receipt_url VARCHAR(255);

-- +migrate Down

-- Remove the card_id and receipt_url columns from the payments table
ALTER TABLE public.payments
DROP COLUMN card_id,
DROP COLUMN receipt_url;

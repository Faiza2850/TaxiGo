-- +migrate Up

-- Add the customer_id column to the cards table
ALTER TABLE public.payments
ADD COLUMN booking_id INT REFERENCES bookings(id) ON DELETE CASCADE;    
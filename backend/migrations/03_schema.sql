-- +migrate Up
ALTER TABLE public.bookings
DROP COLUMN firstname,
DROP COLUMN lastname,
DROP COLUMN email,
DROP COLUMN phone_number;

ALTER TABLE public.feedback
DROP COLUMN name,
DROP COLUMN email;

ALTER TABLE public.users
ALTER COLUMN password DROP NOT NULL,  -- Make the password column nullable
ALTER COLUMN address DROP NOT NULL,   -- Make the address column nullable
ALTER COLUMN city DROP NOT NULL,      -- Make the city column nullable
ALTER COLUMN country DROP NOT NULL,   -- Make the country column nullable
ALTER COLUMN postcode DROP NOT NULL;
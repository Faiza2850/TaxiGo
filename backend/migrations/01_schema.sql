-- +migrate Up
ALTER TABLE public.locations
ADD COLUMN total_distance FLOAT DEFAULT 0;

ALTER TABLE public.bookings
ADD COLUMN standard_fare DECIMAL(10, 2) NOT NULL,
ADD COLUMN two_way BOOLEAN NOT NULL,
ADD COLUMN multiple_journey_disc DECIMAL(10, 2) NOT NULL;


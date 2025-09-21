-- +migrate Up

ALTER TABLE public.users
    ALTER COLUMN postcode TYPE varchar(255),
    ALTER COLUMN address TYPE varchar(255);
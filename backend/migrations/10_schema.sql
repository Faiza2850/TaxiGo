-- +migrate Up
CREATE TABLE IF NOT EXISTS  public.waypoints (
    id serial NOT NULL,
    location_id integer REFERENCES locations(id) NOT NULL,
    waypoint public.geography(Point,4326) NOT NULL
);

ALTER TABLE public.locations
    DROP COLUMN waypoints;
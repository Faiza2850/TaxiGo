-- +migrate Up
CREATE TABLE IF NOT EXISTS public.users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  phone_number VARCHAR(255) NOT NULL,
  address VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  postcode NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS public.locations(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  location_name VARCHAR(255) NOT NULL,
  start_point GEOGRAPHY(Point, 4326) NOT NULL,
  end_point GEOGRAPHY(Point, 4326) NOT NULL,
  waypoints GEOGRAPHY [],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cars (
  id SERIAL PRIMARY KEY,
  mileage_price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  car_category VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  metadata VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  car_id INT REFERENCES cars(id) ON DELETE CASCADE,
  location_id INT REFERENCES locations(id) ON DELETE CASCADE,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  number_of_passengers INT NOT NULL,
  number_of_suitcases INT NOT NULL,
  flight_number VARCHAR(20),
  flight_arriving_from VARCHAR(100),
  flight_date_time TIMESTAMP,
  meet_and_greet BOOLEAN DEFAULT FALSE,
  has_pet BOOLEAN DEFAULT FALSE,
  booking_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.payments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  payment_type VARCHAR(50) NOT NULL,
  payment_status VARCHAR(20) NOT NULL,
  payment_intent_id VARCHAR(255),
  charge_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
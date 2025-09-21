-- +migrate Up
INSERT INTO public.cars (mileage_price, available, car_category, image, metadata) VALUES
(30, TRUE, 'Executive Car', 'ExecutiveCar.svg', 'E Class Mercedes or similar. These can accommodate up to 3 passengers plus 3 standard suitcases (23kg max), or 4 passengers plus hand luggage. E-Class Mercedes or similar.'),
(25, TRUE, 'Saloon Car', 'saloonCar.svg', 'Ford Mondeo. VW Passat or similar. These can accommodate up to 3
passengers plus 3 standard suitcases (23kg max). or 4 passengers plus hand luggage. Ford Mondeo or Passat or similar.'),
(40, TRUE, 'Estate Car', 'EstateCar.svg', 'Volvo Estate, VW Passat or similar. These can accommodate up to 4 passengers plus 4 standard suitcases (23kg max). Volvo Estate, VW Passat or similar.'),
(22, TRUE, 'Executive People Carrier', 'ExecutivePeopleCarrier.svg', 'Mercedes Viano or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage. Mercedes Viano or similar.'),
(35, TRUE, 'People Carrier', 'PeopleCarrier.svg', 'VW Sharan, Ford Galaxy or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage. VW Sharan, Ford Galaxy or similar.'),
(28, TRUE, '8 Seater mini Bus', '8SeaterminiBus.svg', 'VW Transporter or similar. These can accommodate 8 passengers plus up to 8 standard suitcases (23kg max). VW Transporter');


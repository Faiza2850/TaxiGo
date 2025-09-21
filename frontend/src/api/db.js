import {
  PencilIco, SaloonCar, ExecutiveCar, EstateCar, PeopleCarrier,
  PencilIcoyellow, ExecutivePeopleCarrier, SeaterMiniBus, Back, BMWBlack,MercedesSClassBlack
} from '../assets/index.js';

export  const airportData = [
  {
    "iata": "LHR",
    "name": "London Heathrow Airport",
    "city": "London",
    "country": "United Kingdom",
    "latitude": 51.4700,
    "longitude": -0.4543
  },
  {
    "iata": "LGW",
    "name": "London Gatwick Airport",
    "city": "London",
    "country": "United Kingdom",
    "latitude": 51.1537,
    "longitude": -0.1821
  },
  {
    "iata": "MAN",
    "name": "Manchester Airport",
    "city": "Manchester",
    "country": "United Kingdom",
    "latitude": 53.3537,
    "longitude": -2.2750
  },
  {
    "iata": "BHX",
    "name": "Birmingham Airport",
    "city": "Birmingham",
    "country": "United Kingdom",
    "latitude": 52.4539,
    "longitude": -1.7480
  },
  {
    "iata": "EDI",
    "name": "Edinburgh Airport",
    "city": "Edinburgh",
    "country": "United Kingdom",
    "latitude": 55.9500,
    "longitude": -3.3725
  },
  {
    "iata": "GLA",
    "name": "Glasgow Airport",
    "city": "Glasgow",
    "country": "United Kingdom",
    "latitude": 55.8717,
    "longitude": -4.4333
  },
  {
    "iata": "BRS",
    "name": "Bristol Airport",
    "city": "Bristol",
    "country": "United Kingdom",
    "latitude": 51.3827,
    "longitude": -2.7190
  },
  {
    "iata": "NCL",
    "name": "Newcastle Airport",
    "city": "Newcastle upon Tyne",
    "country": "United Kingdom",
    "latitude": 55.0375,
    "longitude": -1.6917
  },
  {
    "iata": "EMA",
    "name": "East Midlands Airport",
    "city": "Derby",
    "country": "United Kingdom",
    "latitude": 52.8311,
    "longitude": -1.3281
  },
  {
    "iata": "BFS",
    "name": "Belfast International Airport",
    "city": "Belfast",
    "country": "United Kingdom",
    "latitude": 54.6575,
    "longitude": -6.2158
  }
];

  export const countryCodes = Array.from({length: 249}, (_, i) => `+${i + 1}`);

  export const rides = [
    { date: 'Today', time: '10:30 Am', car: 'BMW 428i Cabrio-Black', from: 'London', to: 'Manchester', price: 341, image: BMWBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: MercedesSClassBlack },
    { date: 'Fri, 28 Jul 2024', time: '17:45 Pm', car: 'Ford E Class-White', from: 'VABC', to: 'CDEFG', price: 311, image: MercedesSClassBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: BMWBlack },
    { date: 'Thu, 4th Aug 2024', time: '09:00 Am', car: 'Audi A6-Silver', from: 'Airport', to: 'City Center', price: 285, image: MercedesSClassBlack },
    { date: 'Sat, 6th Aug 2024', time: '13:30 Pm', car: 'Tesla Model S-Red', from: 'Hotel', to: 'Conference Center', price: 420, image: BMWBlack },
    { date: 'Today', time: '10:30 Am', car: 'BMW 428i Cabrio-Black', from: 'London', to: 'Manchester', price: 341, image: MercedesSClassBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: MercedesSClassBlack },
    { date: 'Fri, 28 Jul 2024', time: '17:45 Pm', car: 'Ford E Class-White', from: 'VABC', to: 'CDEFG', price: 311, image: MercedesSClassBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: BMWBlack },
    { date: 'Thu, 4th Aug 2024', time: '09:00 Am', car: 'Audi A6-Silver', from: 'Airport', to: 'City Center', price: 285, image: MercedesSClassBlack },
    { date: 'Sat, 6th Aug 2024', time: '13:30 Pm', car: 'Tesla Model S-Red', from: 'Hotel', to: 'Conference Center', price: 420, image: BMWBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: MercedesSClassBlack },
    { date: 'Fri, 28 Jul 2024', time: '17:45 Pm', car: 'Ford E Class-White', from: 'VABC', to: 'CDEFG', price: 311, image: MercedesSClassBlack },
    { date: 'Wed, 3rd Aug 2024', time: '14:15 Pm', car: 'Mercedes S Class-Black', from: 'Vale St', to: 'Chapel St', price: 341, image: BMWBlack },
    { date: 'Thu, 4th Aug 2024', time: '09:00 Am', car: 'Audi A6-Silver', from: 'Airport', to: 'City Center', price: 285, image: MercedesSClassBlack },
    { date: 'Sat, 6th Aug 2024', time: '13:30 Pm', car: 'Tesla Model S-Red', from: 'Hotel', to: 'Conference Center', price: 420, image: BMWBlack },
    // Add more ride history items as needed
  ];

    // {LiveChat}
    const time = new Date(Date.now() - 300 * 1000).toISOString()
    export const dummychat = [
      {
        "timestamp":  new Date(Date.now() - 120 * 1000 ).toISOString(),
        "user": "Customer",
        "message": "Hi there! I need help with my order."
      },
      {
        "timestamp":  new Date(Date.now() - 60 * 1000).toISOString(),
        "user": "Agent",
        "message": "Hello! I'd be happy to help you. Could you please provide your order number?"
      },
      {
        "timestamp":  new Date(Date.now() - 30 * 1000).toISOString(),
        "user": "Customer",
        "message": "Sure, it's 123456."
      },
      {
        "timestamp":  time ? '' : time,
        "user": "Agent",
        "message": "..."
      },
    ];
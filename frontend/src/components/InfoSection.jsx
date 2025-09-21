import React from 'react';
import {img1, img2, img3, img4, img5, img6} from '../assets/index';

const InfoSection = () => {
  const vehicles = [
    {
      title: "Saloon Car",
      description:
        "Ford Mondeo. VW Passat or similar. These can accommodate up to 3 passengers plus 3 standard suitcases (23kg max). or 4 passengers plus hand luggage. Ford Mondeo or Passat or similar.",
      imageSrc: img1,
    },
    {
      title: "Executive Car",
      description:
        "E Class Mercedes or similar. These can accommodate up to 3 passengers p,ÅJS 3 standard suitcases (23kg max). or 4 passengers plus hand luggage. E-Class Mercedes or similar. or 4 passengers plus hand luggage. Ford Mondeo or Passat or similar.",
      imageSrc: img2,
    },
    {
      title: "Estate Car",
      description:
        "Volvo Estate, VW Passat or similar. These can accommodate up to 4 passengers plus 4 standard suitcases (23kg max). Volvo Estate, VW Passat or similar",
      imageSrc: img3,
    },
    {
      title: "People Carrier",
      description:
        "VW Sharan, Ford Galaxy or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",
      imageSrc: img4,
    },
    {
      title: "Executive People Carrier",
      description:
        "Mercedes Viano or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",
      imageSrc: img5,
    },
    {
      title: "8 Seater Minibus",
      description:
        "VW Transporter or similar. These can accommodate 8 passengers plus up to 8 standard suitcases (23kg max).",
      imageSrc: img6,
    },
  ];
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="text-center max-w-7xl py-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-5">
          <span className="text-[#FFCA09]">TAXI TRANSFERS </span>
          <span>TO AND FROM ALL UK AIRPORTS</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-4 text-justify">
          We specialize in taxi transfers to and from all UK airports for both individuals and groups, with an emphasis on a courteous
          and thoroughly professional personal service at affordable prices. 24 hours a day. 7 days a week,
          if you would like a quote for a journey you are planning please select the 'Type of Journey' you require and enter the post
          code on the 'Instant Online Quote' form above. If you don't have the post code please select the 'Type of Journey' and
          then click on the 'Manual Quote' button and fil in as many details as possible and we will email you with a quote as soon
          as possible. The price we quote is the price you pay.
        </p>
        <p className="text-sm  sm:text-base md:text-xl mt-4 text-justify">
          From the moment you contact us, we'll do everything we can to ensure that your booking and transfer go as smoothly as
          possible. That means an air-conditioned vehicle tailored to the number of passengers and the luggage requirements
          specified by you, and an experienced driver with proven customer service skills and an extensive knowledge of the local area.
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-normal mb-5  mt-20  text-[#FEB601]">
          SERVICES
        </h3>
        <p className="text-sm sm:text-base md:text-xl mt-4 text-justify">
        A 'Meet and Greet' service can be arranged when booking whereby the driver will be in arrivals with the passengers name or company name, whichever you prefer. A comforting thought, especially for first time visitors in a foreign country. If your flight is early or subject to delays, we will track your flight's progress and send your driver at the new expected time of arrival. A lot of our work is corporate based so if you are booking a taxi for other people you need not worry we will give them the professional quality service they would expect We accept most major credit cards and debit cards and send receipts via email. OTS also welcomes corporate account customers and, subject to credit references, we'll be happy to offer you a monthly invoicing facility or direct debit on our airport taxi services.
        </p>
        
        <h3 className="text-xl sm:text-2xl md:text-3xl font-normal mb-5 mt-20 text-[#FEB601]">
          POPULAR <span className="text-white font-light">LOCATIONS</span>
        </h3>
        <p className="mb-6 font-light text-sm  sm:text-base md:text-xl text-justify ">
          We cover the whole of the UK, including many popular locations such
          as:
          <br />
          <span className="text-[#FEB601] text-center text-sm  sm:text-base md:text-xl ">
            Aberdeen, Belfast-City, Belfast-International, Birmingham,
            Blackpool, Bournemouth, Bristol, Cardiff, Coventry, East-Midlands,
            Edinburgh, Exeter, Gatwick, Glasgow, Heathrow, Humberside,
            Inverness, Leeds-Bradford, Liverpool, London-City, Luton,
            Manchester, Newcastle, Newquay, Norwich, Plymouth, Prestwick,
            Sheffield, Southampton, Southend, Stansted, Teesside,
          </span>{" "}
          and Many more....
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal mb-5 mt-20">
        OUR <span className="text-[#FEB601]">EXTENSIVE</span> FLEET
      </h2>
      <p className="mb-6 font-light text-sm  sm:text-base md:text-2xl">
        We provide access to a large fleet of vehicle sizes and types.
        Regardless of your party size, luggage, or special requirements, we can
        usually provide the perfect vehicle.
      </p>

      {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="p-4 rounded-lg  flex gap-4 items-center max-sm:flex-col"
          >
            <div className="w-[30%] max-sm:w-[60%]">
              <img
                src={vehicle.imageSrc}
                alt={vehicle.title}
                className="object-contain md:w-[300px] w-[500px]"
              />
            </div>
            <div className="w-[70%] max-sm:w-[120%]">
              <h3 className=" font-poppins ml-4 md:text-3xl text-[16px]  font-bold md:leading-[33px]   text-justify text-[#FEB601]">
                {vehicle.title}
              </h3>
              <p className="font-poppins ml-4 text-[20px] font-light md:leading-[30px] text-sm  sm:text-base md:text-2xl text-justify mb-2 ">
                {vehicle.description}
              </p>
            </div>
          </div>
        ))}


      </div>

    </div>
  );
};

export default InfoSection;

import React, { useState, useEffect } from "react";
import { TfiBackLeft } from "react-icons/tfi";
import { HiShoppingCart } from "react-icons/hi2";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getCurrentBooking } from "../api/api";
import { BackYellow } from "../assets";

const OrderSummary = ({ isOneWay,fare }) => {
    const location = useLocation(); 
    const [isTwoWay,setIsTwoWay]=useState(false)
    const [meetandgreet,setmeetAndGreet]=useState(false)

    

    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const user_id = query.get('user_id');
    const id = query.get('bid');
    const twoway = query.get('twoway');
    const carid = query.get('carid');
    const lid = query.get('lid');
    const [data,setData] =useState()
    const back=()=>{
        // navigate(`/`) 
      
          navigate(-1); // Previous page par navigate karein
        
    }
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await getCurrentBooking(user_id, id);
              setData( res.data[0])
              setIsTwoWay(res.data[0].two_way)
              setmeetAndGreet(res.data[0].meet_and_greet)
          } catch (error) {
              console.error("Error fetching car data:", error);
          }
      };

    fetchData();
  }, [user_id, id]);
    const standardFare = data?data.standard_fare:""; 
    const meetAndGreet =  meetandgreet ? 50 : 0;
    const FareDiscount = data?data.multiple_journey_disc:"";
    const oneWayTotalFare = standardFare + meetAndGreet;
    const twoWayTotalFare = ((standardFare * 2)) + meetAndGreet - (FareDiscount*2);
    const [journeyDetails, setJourneyDetails] = useState(isOneWay); 
    
    useEffect(() => {
        // Update the state when the prop changes
        setJourneyDetails(isOneWay);
    }, [isOneWay]);
    const navigate = useNavigate()

    const payout=()=>{
        navigate(`/Cardpage/${user_id}/${id}`)
      }
     
    const singleOrderDetails = data ? [
        { label: "Start:", value: data.start_point.name },
        { label: "End:", value: data.end_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const FirstJourneyOrderDetails = data
    ? [
        { label: "Start:", value: data.start_point.name },
        { label: "End:", value: data.end_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const SecondJourneyOrderDetails = data
    ? [
        { label: "Start:", value: data.end_point.name },
        { label: "End:", value: data.start_point.name },
        { label: "Flight Arrival:", value: data.flight_date_time },
        { label: "Fleet:", value: data.car_category },
        { label: "Passengers:", value: data.number_of_passengers + " Person" },
        { label: "Suitcase:", value: data.number_of_suitcases + " Suitcase" },
        {
          label: "Arriving Flight:",
          value: data.flight_number && data.flight_arriving_from,
        },
        {
          label: "Meet & Greet:",
          value: data.meet_and_greet ? "Selected" : "Not Selected",
        },
      ]
    : [];

  const OnewayfareDetails = [
    { label: "Standard Fare:", value: `£${standardFare}` },
    { label: "Meet and Greet:", value: `+£${meetAndGreet}` },
    { label: "Total Fare:", value: `£${oneWayTotalFare}` },
  ];

  const ReturnfareDetails = [
    { label: "Multiple Journey Discount:", value: `£${FareDiscount}` },
    { label: "Standard Fare:", value: `£${(standardFare * 2)}` },
    { label: "Meet and Greet:", value: `+£${meetAndGreet}` },

        { label: "Total Fare:", value: `£${twoWayTotalFare}` },
    ];
   
    return (
        <>
            <div className="min-h-screen  bg-gray-100 py-12 relative">
                <div className="container mt-[-4rem] md:mt-[-7rem] lg:mx-auto mx-auto">
                    <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-12 w-full lg:w-[100%] mx-auto">
                        <h2 className="text-4xl font-bold mb-2 text-[#333333]">TAXIGO</h2>
                        <p className="text-lg mb-6">Your Order Summary</p>
                         


                        {/* Conditionally render based on journeyDetails state */}
                        {isTwoWay ? (
                            <>
                                <p className="text-lg mb-6">FIRST JOURNEY</p>
                                {FirstJourneyOrderDetails.map((detail, index) => (
                                    <div className="flex justify-between" key={index}>
                                        <h5 className="text-[#FE9901] font-semibold md:text-xl text-lg poppins">{detail.label}</h5>
                                        <h5 className="text-right font-md md:text-xl text-md poppins">{detail.value}</h5>
                                    </div>
                                ))}
                                <p className="text-lg mb-6 mt-6">SECOND JOURNEY</p>
                                {SecondJourneyOrderDetails.map((detail, index) => (
                                    <div className="flex justify-between" key={index}>
                                        <h5 className="text-[#FE9901] font-semibold md:text-xl text-lg poppins">{detail.label}</h5>
                                        <h5 className="text-right font-md md:text-xl text-md poppins">{detail.value}</h5>
                                    </div>
                                ))}

                {/* Fare Details */}
                {ReturnfareDetails.map((fare, index) => (
                  <div
                    className={`flex justify-between mt-2 p-2 rounded ${
                      index === 3 ? "bg-black" : "bg-[#111D47]"
                    }`}
                    key={index}
                  >
                    <h5 className="text-[#FE9901] font-semibold md:ml-5 md:text-xl text-md poppins">
                      {fare.label}
                    </h5>
                    <h5 className="text-right font-semibold text-white text-xl">
                      {fare.value}
                    </h5>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Single Journey Details */}
                {singleOrderDetails.map((detail, index) => (
                  <div className="flex justify-between" key={index}>
                    <h5 className="text-[#FE9901] font-semibold md:text-xl text-lg poppins">
                      {detail.label}
                    </h5>
                    <h5 className="text-right font-md md:text-xl text-md poppins">
                      {detail.value}
                    </h5>
                  </div>
                ))}

                {/* One-way Fare Details */}
                {OnewayfareDetails.map((fare, index) => (
                  <div
                    className={`flex justify-between mt-2 p-2 rounded ${
                      index === 2 ? "bg-black" : "bg-[#111D47]"
                    }`}
                    key={index}
                  >
                    <h5 className="text-[#FE9901] font-semibold md:ml-5 md:text-xl text-md poppins">
                      {fare.label}
                    </h5>
                    <h5 className="text-right font-semibold text-white text-xl">
                      {fare.value}
                    </h5>
                  </div>
                ))}
              </>
            )}

            <div className="md:flex justify-center md:gap-20 mt-8">
             
            <button
                onClick={back}
                className="bg-black text-[#FEB601] p-2 py-3 text-xl font-semibold rounded md:w-[400px] w-full flex max-w-xl items-center mb-2 justify-center"
              >
                Back
                <img src={BackYellow} className="ml-2 mr-2 pt-1 " ></img>
              </button>
              <button
                onClick={payout}
                className="bg-[#FEB601] text-black p-2 py-3 text-xl font-semibold rounded md:w-[400px] w-full flex max-w-xl items-center mb-2 justify-center"
              >
                Proceed to Pay
                <HiShoppingCart className="ml-2 mr-2" />
              </button>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

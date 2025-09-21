import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tick from '../assets/Tick.svg';
const BookingComplete = () => {
  const navigate= useNavigate()
  const handleDoneClick = () => {
  navigate('/')
  };

  const handleNextRideClick = () => {
    navigate('/')
  };

  return (

    <div className="  bg-white rounded-3xl  md:-mt-12  shadow-lg p-6 max-w-6xl    my-0 mx-auto">
    <div className="w-full max-w-7xl bg-white rounded-lg md:p-8">

      <h1 className="md:text-5xl  text-3xl font-bold text-black mb-4">TAXIGO</h1>
      <p className="text-lg"> Checkout Form</p>

     <div className="md:flex justify-center items-center  bg-gray-100  md:border-b-black">
      <div className="bg-white p-8 md:border md:border-black  md:rounded-lg md:shadow-lg md:shadow-[#727272] text-center md:max-w-md max-w-5xl w-full">
        <div className="flex justify-center mb-1"> 

          <div className="p-4">
            <img src={Tick} alt="" />
          </div>
        </div>
        <h2 className="text-xl font-bold w-full mb-4">Booking Completed</h2>
        <p className="text-gray-600 mb-6 md:ml-10 md:w-[300px] w-full text-[#667085]">
          Your Booking has been Completed for Airport Taxi.
        </p>
        <div className="flex md:flex-row flex-col-reverse justify-center md:space-x-4">
          <button
            onClick={handleDoneClick}
            className="bg-black text-white md:w-[160px] w-full h-[40px] py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            Done
          </button>
          <button
            onClick={handleNextRideClick}
            className="bg-[#FFCA09] hover:bg-yellow-600 md:w-[160px] w-full h-[40px] text-black py-2 px-6 mb-3 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Book Next Ride
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default BookingComplete;

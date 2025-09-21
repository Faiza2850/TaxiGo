import React, { useState, useEffect } from 'react';
import { getRideHistory } from '../api/api.js';
import {
  BackYellow
} from '../assets/index.js';
import {Link} from 'react-router-dom'

const RideHistoryItem = ({ flight_date_time, car_category, start_point, end_point, total_price, image }) => {

  const formattedFrom = start_point ? `${start_point.name} ` : "N/A"; // Handle case if start_point is null

  const formattedTo = end_point ? `${end_point.name} ` : "N/A"; 

  return (
    <div className="bg-[#000000] h-auto md:h-64 max-w-6xl mx-auto text-[#FFFFFF] p-4 rounded-lg mb-4 md:mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className="text-[#FFCA09] font-semibold text-sm md:text-[28px] mt-2 mb-4 md:mt-4">{flight_date_time}</div>
          <div className="font-bold md:-mt-+ md:mb-8 text-lg md:text-[32px]">{car_category}</div>
          <div className='flex flex-col gap-3 text-sm md:text-[28px] mt-2 md:mb-4'>
            <span className='text-[#FFCA09]'>From: <span className='text-white'>{formattedFrom}</span> </span>
            <span className='text-[#FFCA09]'> To: <span className='text-white'>{formattedTo}</span></span>
          </div>
          <div className="font-bold text-xl md:text-[36px] md:mt-6 mt-3 text-[#FFCA09]">£{total_price}</div>
        </div>
        <img src={image} alt={car_category} className="w-32 h-24 md:w-72 md:h-40 mt-4 md:mt-10 object-contain" />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  if (currentPage > 3) pageNumbers.push(1);
  if (currentPage > 4) pageNumbers.push("...");

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2) pageNumbers.push("...");
  if (currentPage < totalPages - 1) pageNumbers.push(totalPages);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Only show left arrow if totalPages is 4 or more */}
      {totalPages > 3 && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#FE9901] font-bold border-[#BEBEBE] border-2"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      )}
      {/* Render the page numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="w-8 h-8 flex items-center justify-center">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md flex items-center justify-center ${
              page === currentPage
                ? "bg-[#FFE3BA] text-[#FE9901] border-[#FE9901] border-2"
                : "bg-white text-black border-[#BEBEBE] border-2"
            }`}
          >
            {page}
          </button>
        )
      )}
      {/* Only show right arrow if totalPages is 4 or more */}
      {totalPages > 3 && (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#FE9901] font-bold border-[#BEBEBE] border-2"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      )}
    </div>
  );
};


const RideHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rides, setRides] = useState([]); // {{ edit_1 }} Initialize rides state
  const itemsPerPage = 4; 
useEffect(()=>{
const fetchRideHistory = async () => {
  try {
    const response = await getRideHistory();
    console.log(response.data.data,"dataaaa")
    if (Array.isArray(response.data.data)) {
      setRides(response.data.data); // Store fetched rides in state
     
    } else {
      setRides([]); // Set to empty array if not an array
    }
      
  } catch (error) {
    console.error("Error fetching ride history:", error);
  }
};

fetchRideHistory();

},[])
  useEffect(() => {
    setTotalPages(Math.ceil(rides.length / itemsPerPage));
  }, [rides]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rides.slice(startIndex, endIndex).map(ride => ({
      ...ride,
      image: require(`../../public/cars/${ride.image}`) // {{ edit_1 }} Map image name to asset path
    }));
   

  };
console.log(rides,"ridesss")
  return (
    <div className="bg-[#FFFFFF] rounded-3xl -mt-6 md:-mt-16 shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold ml-4 md:ml-10 mb-1 md:mb-4">TAXIGO</h1>
      <h2 className="text-xl md:text-2xl ml-4 md:ml-10 mb-2 md:mb-4">Ride History</h2>
     
      {rides.length==0? 
        <div className='m-auto text-center text-yel'>
       <h1>No Ride History</h1>
        </div>
      :
      getCurrentPageItems().map((ride, index) => (
        <RideHistoryItem key={index} {...ride} />
      ))}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage}
      />
      <div className="flex justify-center">
      <Link to='/profile'>
      <button className="mt-4 bg-black text-[#FEB601] py-2 px-4 rounded-md font-bold flex items-center justify-center  md:w-[400px] w-[400px] max-sm:max-w-72">
        Back
        <img src={BackYellow} alt="Back" className="w-4 h-4 mr-2 ml-2" />
      </button>
      </Link>
      </div>
    </div>
  );
};

export default RideHistory;

import React, { useState, useEffect } from 'react';
import { BackYellow } from '../assets/index.js';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getQuotebyId } from '../api/api.js';

// Component for displaying individual ride history items
const QuotesHistoryItem = ({   start_point,
    end_point, onClick }) => {

  return (
    <div className="bg-[#000000] h-auto max-w-6xl mx-auto text-[#FFFFFF] p-4 rounded-2xl mb-4"  onClick={onClick}>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-3 text-sm  py-2 ml-3 mt-2 mb-4">
            <span className="text-[#FFCA09] flex flex-row font-semibold">
             <span className=' mt-4' >
              From: <span className="text-white">{start_point.name}</span>
              </span>
            </span>
            <span className=' m-3 ' >
            {/* <GiPathDistance size={90}  /> */}
            </span>
            {/* {via ? (
              <span className="text-[#FFCA09] font-semibold">
                Via: <span className="text-white">{via}</span>
              </span>
            ) : null} */}
            <span className="text-[#FFCA09] flex flex-row font-semibold">
                        <span className=' mt-4' >
              To: <span className="text-white">{end_point.name}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination component with logic to hide arrows if pages are less than 4
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  if (currentPage > 3) pageNumbers.push(1);
  if (currentPage > 4) pageNumbers.push("...");

  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2) pageNumbers.push("...");
  if (currentPage < totalPages - 1) pageNumbers.push(totalPages);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {totalPages >= 4 && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#FE9901] font-bold border-[#BEBEBE] border-2"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      )}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="w-8 h-8 flex items-center justify-center">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md flex items-center justify-center ${
              page === currentPage
                ? 'bg-[#FFE3BA] text-[#FE9901] border-[#FE9901] border-2'
                : 'bg-white text-black border-[#BEBEBE] border-2'
            }`}
          >
            {page}
          </button>
        )
      )}
      {totalPages >= 4 && (
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

// Main Quotes History component
const QuotesHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [quotes, setQuote]=useState([]) 
  const [loading, setLoading] = useState(true);
//   const [quotes, setRides] = useState([
//     { From: 'London', via: null, To: 'Manchester' },
//     { From: 'Manchester', via: 'Birmingham', To: 'Wales' },
//     { From: 'Wales', via: null, To: 'Bristol' },
//     { From: 'Bristol', via: null, To: 'Bradford' },
//     { From: 'Bradford', via: null, To: 'Oxford' }
//     // Add more ride data if needed
//   ]); // Static ride data for demonstration





useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      Swal.fire({
        title: 'Loading...',
        text: 'Fetching Quotes, please wait.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      try {
        const response = await getQuotebyId();

        if (response.data && Array.isArray(response.data)) {
          setQuote(response.data); // Store fetched rides in state
        } else {
          setQuote([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    fetchQuotes();
  }, []);
console.log("response", quotes)
  const itemsPerPage = 4;


  useEffect(() => {
    setTotalPages(Math.ceil(quotes.length / itemsPerPage));
  }, [quotes]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return quotes.slice(startIndex, endIndex);
  };

  const navigate = useNavigate();

  const handleQuotes = (locationId) => {
    navigate(`/fleet/${locationId}`);
  };
  return (
    <div className="bg-[#FFFFFF] rounded-3xl shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold ml-2 md:ml-10 mb-1 md:mb-4">TAXIGO</h1>
      <h2 className="text-xl md:text-2xl ml-2 md:ml-10 mb-2 md:mb-4">Quotes History</h2>
{loading ? (
          <div className="m-auto text-center text-yel">
            <h1>Loading...</h1>
          </div>
        ) :
      quotes.length === 0 ? (
        <div className="m-auto text-center text-[#FFCA09]">
          <h1>No Quotes History</h1>
        </div>
      ) : (
        getCurrentPageItems().map((ride, index) => (
          <QuotesHistoryItem key={index} {...ride}
          onClick={() => handleQuotes( ride.location_id)}
           />
          
        ))
      )
    }
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <div className="flex justify-center">
        <Link to="/profile">
          <button className="mt-4 bg-black text-[#FEB601] py-2 px-4 rounded-md font-bold flex items-center justify-center w-[200px] md:w-[300px] lg:w-[400px]">
            Back
            <img src={BackYellow} alt="Back" className="w-4 h-4 mr-2 ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuotesHistory;
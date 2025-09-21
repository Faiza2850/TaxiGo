import { React, useState, useEffect} from 'react';
import edit from '../../assets/edit.svg';
import Car from '../../assets/Car.svg';
import { img1, img2, img3, img4, img5, img6 } from '../../assets/index';
import { fetchAllCars } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

function DashBoard() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_IMAGE_URL = 'http://localhost:3000/cars';
    useEffect(() => {
        const getVehicles = async () => {
          try {
            const data = await fetchAllCars();
            setVehicle(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        getVehicles();
      }, []);
      if (loading) {
        return <div>Loading...</div>;
      }
console.log("all cars",vehicle)
    const bookings = [
        { 
           id: 1, 
           fleet: 'Saloon Car', 
           date: '10/08/2024', 
           ratePerMile: 13, 
           status: 'Paid', 
        },
        { 
            id: 2, 
            fleet: 'Executive Car', 
            date: '11/18/2024', 
            ratePerMile: 33, 
            status: 'Unpaid' 
        },
        { 
            id: 3,
           fleet: 'Estate Car', 
           date: '11/20/2024', 
           ratePerMile: 51, 
           status: 'Pending' 
        },
        { 
            id: 4, 
           fleet: 'People Carrier', 
           date: '11/22/2024', 
           ratePerMile: 57, 
           status: 'Paid' 
        },
        { 
            id: 5, 
           fleet: '8 Seater Mini Bus', 
           date: '12/25/2024', 
           ratePerMile: 82, 
           status: 'Paid' 
        },
    ];

    const Fleets = [
        { 
           id: 1, 
           fleet: 'Saloon Car', 
           ratePerMile: 13, 
           image: img1,
        },
        { 
            id: 2, 
            fleet: 'Executive Car', 
            ratePerMile: 17, 
            image: img2,
        },
        { 
            id: 3, 
           fleet: 'Estate Car', 
           ratePerMile: 33, 
           image: img3,
        },
        { 
            id: 4, 
           fleet: 'People Carrier', 
           ratePerMile: 24, 
           image: img4,
        },
        { 
            id: 5, 
           fleet: '8 Seater Mini Bus', 
           ratePerMile: 19, 
           image: img6,
        },
    ];
console.log("booking sttis", bookings[0].status)
    return (
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 max-w-7xl mx-auto mt-10">
            <div className="mx-4 md:mx-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#333333] text-center">All Bookings</h2>
                <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 font-semibold text-gray-600 p-2 border-b-2 border-b-yel ">
                        <div>Fleet</div>
                        <div>Date</div>
                        <div>Rate/Mile</div>
                        <div>Status</div>
                        <div>Edit</div>
                    </div>
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="grid grid-cols-5 p-2 text-gray-800 hover:bg-gray-100 transition-colors border-b"
                        >
                            <div>{booking.fleet}</div>
                            <div>{booking.date}</div>
                            <div>£ {booking.ratePerMile.toFixed(2)}</div>
                            <div className={`px-2 py-1 rounded-full text-black ${booking.status === 'Paid' ? 'bg-teal-100 text-teal-600' : booking.status === 'UnPaid' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
                                 <span className="font-bold">{booking.status}</span>
                            </div>
                            <button>
                                <img src={edit} alt="Edit" className="w-6 h-6 object-cover transform scale-x-[-1]" />
                            </button>
                        </div>
                    ))}
                </div>

               <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#333333] text-center mt-20">All Fleets</h2>
               <div className="border rounded-lg overflow-hidden text-center">
                   <div className="grid grid-cols-4 font-semibold text-gray-600 p-2 border-b-2 border-b-yel ">
                       <div>Fleet</div>
                       <div>Rate/Mile</div>
                       <div>Image</div>
                       <div>Edit</div>
                   </div>
                   {vehicle.map((fleet) => (
                       <div
                           key={fleet.id}
                           className="grid grid-cols-4 p-2 text-gray-800 hover:bg-gray-100 transition-colors border-b"
                       >
                           <div className="font-bold mt-9">{fleet.car_category}</div>
                           <div className="font-bold mt-9">£ {fleet.mileage_price.toFixed(2)}</div>
                           <img 
                            src={`${BASE_IMAGE_URL}/${fleet.image}`}
                            alt={fleet.car_category} className="w-[148px] h-auto object-contain mx-auto  transform scale-x-[-1] mt-4" />
                           <button>
                               <img src={edit} alt="Edit" className="w-7 h-7 object-cover mx-auto transform scale-x-[-1]" /> 
                           </button>
                       </div>
                   ))}
               </div>
                <button className='w-[200px] lg:w-[400px] h-[54px] bg-[#FFCA09] mt-20 mb-5 mx-auto   flex items-center justify-center gap-2 rounded'>Add New Fleet
                    <img src={Car} alt="" className="w-5 h-5 object-cover transform scale-x-[-1]" />
                </button>
            </div>
        </div>
    );
}

export default DashBoard;
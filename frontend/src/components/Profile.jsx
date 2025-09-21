import React, {useContext} from 'react'
import {bucket, logoutimg, quotes, viewbook} from '../assets/index';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';


import { FaArrowRight, FaCalendarPlus, FaCreditCard, FaPencilAlt } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { getRideHistory } from '../api/api';
import { jwtDecode } from "jwt-decode";


 const Profile = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);

  const token = Cookies.get('authToken'); 
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      var user_Id = decodedToken.id ;
  
    } catch (error) {
      console.error("Invalid token", error);
    }
  } else {
    console.log("No token found in cookies.");
  }
  const managecard=()=>{
    navigate(`/manage-card/${user_Id}`)
  }
const handleLogout=()=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to logout",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      Cookies.remove('authToken');
      logout();
      navigate("/login")
    }
  })

}
const ridehistory=()=>{
  navigate("/ride-history")
}
const viewbookings=()=>{
  navigate("/view-bookings")
}
const viewQuote=()=>{
  navigate("/quotes-history")
}

  return (
   
    <div className='p-10  xl:p-20 xl:pr-40 md:p-8  md:max-w-7xl bg-white mx-auto mt-[-4rem]  rounded-xl'>
        <h1 className='font-bold text-4xl '>TAXIGO</h1>
        <h5 className='text-xl mt-2'>Profile</h5>
        <h4 className='pt-4 font-semibold md:w-1/2 '>From here you can manage Bookings you've made or
        Create new bookings or Change your account Information</h4>
        <p className='pt-5 w- text-[#667085] pb-5 md:w-1/2'>Access your Rides history to see all your previous rides
        and other ride details.</p>
      
        <button onClick={ridehistory} className="bg-[#FFCA09] text-black p-2 rounded  md:w-96  w-full font-semibold poppins flex  items-center justify-center">
        Rides History <img src={bucket} className='mr-2 ml-3' />
        </button>
       
        <h4 className='pt-5 font-semibold text-xl'>Manage Your Bookings </h4>
        <p className='text-[#667085] pb-5 md:w-3/5'>You can make amendments to your bookings up until the 24 hours before your Journey is due to start. You can also downlload copies of receipts for previous bookings here.</p>
        <div className='flex  md:flex-row md:gap-6 gap-1  '>
  <Link to ='/'>
  <button className='bg-[#FFCA09] text-black p-2 rounded font-semibold poppins md:w-96 w-full md:text-base text-sm flex items-center justify-center'>
    Make a Booking <FaCalendarPlus className="md:mr-2 mr-1 md:ml-2 ml-1" />
  </button>
  </Link>
 
  <button onClick={viewbookings} className='bg-[#FFCA09] text-black p-2 rounded font-semibold poppins md:text-base text-sm md:w-96 w-1/2 flex items-center justify-center'>
    View Bookings <img src={viewbook} className='mr-2 ml-2 -mb-1 h-5 w-5' />
  </button>
 
</div>


        <h4 className='pt-5 font-semibold'>Recover Your Quotes</h4>
        <p className='text-[#667085] pb-5 md:w-3/5'>If we have previously quoted for a Journey you can select the quote here and 
proceed with booking. You can also call us with the reference number from
your quote and continue your booking over the phone. </p>

<button onClick={viewQuote} className='bg-[#FFCA09] text-black p-2 rounded  font-semibold poppins flex md:w-96 w-full items-center justify-center '>View Quotes <img src={quotes} className='mr-2 ml-2'  /></button>

<h4 className='pt-5 font-semibold'>Manage Payment Methods</h4>
<p className='text-[#667085] pb-5 md:w-3/5'>If you have previously saved cards while booking online you may review and
remove them here.</p>

<button onClick={managecard} className='bg-[#FFCA09] text-black p-2 rounded  font-semibold  poppins flex md:w-96 w-full items-center justify-center '>Card Details <FaCreditCard className="mr-2 ml-2" /> </button>

<h4 className='pt-5 font-semibold'>Update Your Details</h4>
        <p className='text-[#667085] pb-5 md:w-3/5'>Keeping your details Up to date helps us to contact you in the event of 
        a problem with your booking. You may Also Change your Password here.</p>
        <div className='flex gap-6'>
        <button onClick={handleLogout} className='bg-[#FFCA09] text-black p-2 rounded font-semibold poppins md:text-base text-sm md:w-96 w-5/2 px-5 flex items-center justify-center '>Log Out <img src={logoutimg} className='mr-2 ml-2 md:h-4 md:w-4 h-3 w-3 ' /> </button>
        <Link to='/edit-profile'>
        <button className='bg-[#FFCA09] text-black p-2 rounded font-semibold poppins md:text-base text-sm md:w-96 w-full flex items-center px-5 justify-center '>Edit Profile <FaPencilAlt className="mr-2 ml-2 h-4 w-4 " /> </button>
         </Link>
        </div>
    </div>
  )
}

export default Profile
import React, {useEffect, useState} from 'react';
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import LiveChat from '../pages/LiveChat';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';



const AdminHeader = ({ isLoggedIn }) => {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const isAdminPage = window.location.pathname === '/admin/login' ;

  // Function to open the chat modal
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("authToken");
        setIsLogin(false);
        navigate("/admin/login");
      }
    })
  }
  
  const handleClick = () => {
    setIsLiveChatOpen(true);
  };

  // Function to close the chat modal
  const handleClose = () => {
    setIsLiveChatOpen(false);
    
  };

  return (
    <div>
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        {/* Left Section: Logo */}
        {/* <Link to="/admin/add-fleet">
        <div className="flex items-center">
        
        <button>
          <img src={logo} alt="TAXIGO Logo" className="h-36 w-36 mr-4 z-10" />
          </button>
        </div>
        </Link> */}
        <Link to="/admin/add-fleet">
  
      <img src={logo} alt="TAXIGO Logo" className="md:h-36 md:w-36 h-40 w-40 mt-[-65px] md:mt-[-50px] md:mb-[-60px] mb-[-68px]  -ml-7   md:-ml-4 " />
 
  </Link>

        {/* Middle Section: Navigation */}
        {/* <div className="flex-1">
          <nav>
            <ul className="md:flex hidden md:justify-center space-x-20">
              <li>
                <Link to="/admin/add-fleet" className="hover:text-[#FFAE00]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/qa" className="hover:text-[#FFAE00]">
                  Q&A
                </Link>
              </li>
              <li>
                <Link to="/tc" className="hover:text-[#FFAE00]">
                  T&C
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFAE00]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div> */}

        {/* Right Section: Profile or Log In */}
        <div className="flex items-center">
        {!isAdminPage&&<button onClick={handleClick} className="bg-[#FFAE00] hidden md:flex text-black px-4 py-1 rounded-3xl hover:bg-[#FFB92E]">
            Live Chat
          </button>}

          {/* Conditional rendering based on user login */}
          {isLogin ? (
            <div className="ml-4 flex items-center space-x-4">
              <button onClick={logout} className="ml-4 text-[#FE9901] px-6 py-1.5 poppins text-sm font-bold bg-white md:rounded-3xl rounded-lg hover:text-[#FFB92E]">
                Log out
              </button>
            </div>
          ) : (
            <Link to="/admin/login">
              <button  className="ml-4 text-[#FE9901] px-6 py-1.5 poppins text-sm font-bold bg-white md:rounded-3xl rounded-lg hover:text-[#FFB92E]">
                Log In
              </button>
            </Link>
          )}
        </div>
      </header>
{/* Modal for Live Chat */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 z-50">
          {/* Black overlay */}
          <div
            className="fixed inset-0  bg-opacity-50 "
            onClick={handleClose} // Close modal when clicking on the overlay
          ></div>
          
          {/* LiveChat Modal */}
          <div className="flex justify-center items-center min-h-screen">
            <LiveChat onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHeader;

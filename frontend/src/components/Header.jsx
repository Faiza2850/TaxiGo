import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import Hamburger from "../assets/HamBurger.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LiveChat from "../pages/LiveChat";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import profilelogo from "../assets/gg_profile.svg";
const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const location = useLocation();

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("authToken");
        setIsLogIn(false);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const isLogged = Cookies.get("authToken");
    setIsLogIn(isLogged);
  }, []);

  // Function to open the chat modal
  const handleClick = () => {
    setIsLiveChatOpen(true);
  };

  // Function to close the chat modal
  const handleClose = () => {
    setIsLiveChatOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {/* <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg> */}
            <img
              src={Hamburger}
              alt="Hamburger Menu"
              className="w-8 h-8 mt-1"
            />
          </button>
        </div>
        {/* Left Section: Logo */}
       

        {/* Middle Section: Navigation for larger screens */}
        <div className="flex-1" >
          <nav>
            <ul className="md:flex hidden md:justify-center lg:space-x-20 md:space-x-14 md:ml-10">
              <li>
                <Link to="/" className="hover:text-[#FFAE00]">
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
        </div>

        {/* Dropdown Menu for mobile */}
        <div>
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-1/3 bg-black text-white md:hidden z-50">
              <nav>
                <ul className="flex flex-col space-y-2 p-4">
                  <li>
                    <Link
                      to="/"
                      onClick={toggleMenu}
                      className={` poppins ${
                        location.pathname === "/"
                          ? "text-[#FFAE00] font-medium"
                          : "hover:text-[#FFAE00]"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/qa"
                      onClick={toggleMenu}
                      className={` poppins ${
                        location.pathname === "/qa"
                          ? "text-[#FFAE00] font-medium"
                          : "hover:text-[#FFAE00]"
                      }`}
                    >
                      Q&A
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tc"
                      onClick={toggleMenu}
                      className={` poppins ${
                        location.pathname === "/tc"
                          ? "text-[#FFAE00] font-medium"
                          : "hover:text-[#FFAE00]"
                      }`}
                    >
                      T&C
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={toggleMenu}
                      className={` poppins ${
                        location.pathname === "/contact"
                          ? "text-[#FFAE00] font-medium"
                          : "hover:text-[#FFAE00]"
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleClick}
                      className="bg-[#FFAE00] font-bold text-sm  max-sm:text-xs text-black px-5 poppins py-1 rounded-md hover:bg-[#FFB92E]"
                    >
                      Live Chat
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Right Section: Profile or Log In */}
        <div className="flex items-center">
          {/* Hide Live Chat button on mobile */}
          <button
            onClick={handleClick}
            className="bg-[#FFAE00] hidden md:flex text-black px-4 py-1 rounded-3xl hover:bg-[#FFB92E]"
          >
            Live Chat
          </button>

          {/* Conditional rendering based on user login */}
          {isLogIn ? (
            <div className="ml-4 flex items-center space-x-4">
              <Link to="/profile">
                <img
                  src={profilelogo}
                  alt="Profile Logo"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="ml-4 text-[#FE9901] px-6 py-1.5 poppins text-sm font-bold bg-white md:rounded-3xl rounded-lg hover:text-[#FFB92E]">
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
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={handleClose}
          ></div>

          {/* LiveChat Modal */}
          <div className="flex justify-center items-center min-h-screen">
            <LiveChat onClose={handleClose} />
          </div>
        </div>
      )}


  <Link to="/">
  
      <img src={logo} alt="TAXIGO Logo" className="h-36 w-36 mt-[-105px] mb-[-40px] lg:ml-3  md:ml-1 ml-[30%]  " />
 
  </Link>
</div>
   
    
  );


};

export default Header;

import React, { useState } from "react";
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";

import { VscEyeClosed,VscEye } from "react-icons/vsc";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {bookride} from "../assets/index"
import { Link } from "react-router-dom";
import { signup } from "../api/api";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";


export const LoginRegister = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); 
  const [showPassword1, setShowPassword1] = useState(false); 

  const [passwordi, setPasswordi] = useState("");
  const [confirmPasswordi, setConfirmPasswordi] = useState("");

  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(LoginEmail, LoginPassword, navigate);

      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password length validation
    if (passwordi.length < 7) {
      setErrorMessage("Password must be at least 8 characters long.");
      console.log(password.length,"length")
      return;
    }
  
    // Password match validation
    if (passwordi !== confirmPasswordi) {
     
      setErrorMessage("Passwords do not match!");
      return;
    }
  
    // If all validations pass, clear the error message
    setErrorMessage("");
  
    // Create an object with the form data
    const userData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      passwordi,
      billingAddress,
      city,
      postcode,
      country,
    };
  
    try {
      // Send the signup request with the user data
      const response = await signup(userData);
  
      // Clear all the form fields after successful signup
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPasswordi("");
      setConfirmPasswordi("");
      setBillingAddress("");
      setCity("");
      setPostcode("");
      setCountry("");
    } catch (error) {
      // Log the error if signup fails
      console.error("Signup failed:", error);
    }
  };

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Toggle between true and false
};
const togglePasswordVisibilityi = () => {
  setShowPassword1(!showPassword1); // Toggle between true and false
};
const toggleLoginPasswordVisibility = () => {
  setShowLoginPassword(!showLoginPassword); // Toggle between true and false
};
  return (
    <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-6 max-w-7xl mx-auto">
      <div className="w-full max-w-7xl bg-white rounded-lg p-8">
        <h1 className="md:text-5xl text-3xl font-bold text-black mb-4">
        TAXIGO
        </h1>
        <p className="text-lg"> Login/Register</p>
        <p className="text-sm text-center mb-4 text-[#BDBDBD] max-w-xl mx-auto mt-6">
          If you have booked before, an account will have been created for you.
          If you are unsure of this account's credentials, select Reset Password
          below.
        </p>

        {/* Login Section */}
       
        <form onSubmit={handleLogin} >
        <div className="mb-8" >
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="text-[#FEB601] block font-bold mb-2">
                E-mail*
              </label>
              <input
                type="email"
                placeholder="Email@yahoo.com"
                className="w-full p-2 border border-[#7A7979] rounded"
                value={LoginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-[#FEB601] block font-bold mb-2">
                Password*
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-2 border border-[#7A7979] rounded"
                value={LoginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex justify-center md:gap-20  mt-8">
            <Link to='/forget-password'>
            <button className="bg-black text-[#FEB601] text-xl p-2 rounded flex w-[30vh] mb-4 md:w-[250px] max-w-md items-center justify-center mr-4">
              Forget Password
              <FaLock className="mr-2 ml-3" />
            </button>
            </Link>
            <Link to="/profile">
              <button  onClick={handleLogin} className="bg-[#FEB601] text-black p-2 text-xl rounded md:w-[250px] w-[30vh] flex max-w-xl items-center justify-center">
                Log In
                <FaSignInAlt className="ml-2 mr-2" />
              </button>
              </Link>
            </div>
          </div>
        </form>

        {/* Registration Section */}
        <p className="text-sm text-center mb-4 text-[#BDBDBD] max-w-xl mx-auto mt-6">
          If you are a <strong>New User/Customer</strong>, fill all the details
          and an account will be created for you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:ml-[70px] gap-5">
          {/* <div className="md:flex md:gap-20 "> */}
            <div className="md:w-[430px] w-[450px] ">
              <label className="block text-[#FEB601] font-bold mb-2">
                First Name *
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="md:w-[430px] w-[450px] md:ml-20">
              <label className="block text-[#FEB601] font-bold mb-2">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
          
            </div>
            <div className="md:w-[430px] w-[450px]">
              <label className="block text-[#FEB601] font-bold mb-2">
                Mobile Number*
              </label>
              <PhoneInput
              
                country="US"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                placeholder="+44 12345679"
                inputClass="custom-phone-input" // Added custom class for more control
                containerClass="custom-phone-container" // Added container class for styling
                
              />
            </div>

            <div className="md:w-[430px] w-[450px] md:ml-20">
              <label className="block text-[#FEB601] font-bold mb-2">
                E-mail*
              </label>
              <input
                type="email"
                placeholder="Email@yahoo.com"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="md:w-[430px] w-[450px]">
      <label className="block text-[#FEB601] font-bold mb-2">
        Password*
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} // Toggle input type based on state
          placeholder="********"
          className="w-full p-2 border border-[#7A7979] rounded-md"
          value={passwordi}
          onChange={(e) => setPasswordi(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility} // Toggle password visibility
          className="absolute right-2.5 top-2.5 text-[#4b5563]"
        >
          {showPassword ? <VscEyeClosed className="h-6 w-6" /> : <VscEye className="w-6 h-6" />} {/* Show icon based on state */}
        </button>
      </div>
    </div>

    <div className="md:w-[430px] w-[450px] md:ml-20">
      <label className="block text-[#FEB601] font-bold mb-2">
        Confirm Password
      </label>
      <div className="relative">
        <input
          type={showPassword1 ? "pas" : "password"} // Toggle input type based on state
          placeholder="********"
          className="w-full p-2 border border-[#7A7979] rounded-md"
          value={confirmPasswordi}
          onChange={(e) => setConfirmPasswordi(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibilityi} // Toggle password visibility for confirm field too
          className="absolute right-2.5 top-2.5 text-[#4b5563]"
        >
          {showPassword1 ? <VscEyeClosed className="h-6 w-6" /> : <VscEye className="w-6 h-6" />} {/* Show icon based on state */}
        </button>
      </div>
    </div>

    {errorMessage && <p className="text-[#ef4444] -mt-5">{errorMessage}</p>}

            <div className="w-[450px] md:w-[960px]">
              <label className="block text-[#FEB601] font-bold mb-2">
                Billing Address
              </label>
              <input
                type="text"
                placeholder="Billing Address"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              />
            </div>
            <div className="md:w-[430px] w-[450px]">
              <label className="block text-[#FEB601] font-bold mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="ABC"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="md:w-[430px] w-[450px] md:ml-20 ">
              <label className="block text-[#FEB601] font-bold mb-2">
                Postcode
              </label>
              <input
                type="text"
                placeholder="63627"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
            </div>
            <div className="md:w-[430px] w-[450px]">
              <label className="block text-[#FEB601] font-bold mb-2">
                Country
              </label>
              <input
                type="text"
                placeholder="ABC"
                className="w-full p-2 border border-[#7A7979] rounded-md"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="md:flex justify-center md:gap-20 mt-8">
            <button
              type="submit"
              className="bg-black text-[#FEB601] p-2 text-xl rounded font-semibold flex w-[30vh] mb-3 md:w-[400px] max-w-md items-center justify-center mr-4"
            >
              Book A Ride
              <img src={bookride} alt="Book a ride"  className="ml-2"/>
            </button>
            <button
              type="submit"
              className="bg-[#FEB601] text-black p-2 text-xl rounded font-semibold flex w-[30vh] mb-3 md:w-[400px] max-w-md items-center justify-center "
            >
              Register
              <FaUserPlus className="ml-2 mr-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;

import React, { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles
import { contactUsApi } from "../api/api";
import LiveChatAdmin from "../pages/LiveChat";
// import Chat from "./LiveChat/Chat";
import Chat from '../assets/Chat.svg';
import send_msg from '../assets/send_msg.svg';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Allow other fields to update correctly
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      mobileNumber: value, 
    });
  };

  const [liveChat, setLiveChat] = useState(false);
  const handleLiveChat = () => {
    setLiveChat(true);
  };
  const handleClose = () => {
    setLiveChat(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      contactUsApi(formData)
    }
    catch (error) {
      console.log(error);
      }
  };

  return (
    <div className="min-h-screen white py-12 max-w-6xl  mx-auto">
      <div className="container mx-auto mt-[-4rem] md:mt-[-7rem] px-0">
        <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-12 w-full lg:w-[100%] mx-auto ">
          <h2 className="text-4xl font-bold mb-2 text-[#333333]">TAXIGO</h2>

          <h2 className="text-2xl mb-2">Contact Us</h2>
          
          <p className="text-center text-[#667085] mb-8 mt-8 text-md ">
            Get help from the expert Onward Travel Solutions staff 24/7 using our LiveChat below.
          </p>
          
          <button onClick={handleLiveChat} className="w-3/4 gap-2 max-sm:w-11/12 max-sm:text-sm bg-[#FFCA09] hover:bg-yellow-600 text-black py-4 rounded-md font-bold justify-center flex mb-10 mx-auto text-xl">
            {/* <svg
              className="w-7 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M7 14h10M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
            Live Chat With An Operator Now
            <img src={Chat} alt="" className="h-7" />
          </button>

          <p className="text-center text-[#667085] sm:mx-24 mb-12 text-md">
            If you have a query relating to your booking, account, or need support then submit an enquiry below. A member of the Customer Service team will investigate and get back to you as soon as possible. For security purposes please do not enter any credit card information into the boxes below.
          </p>
          
          <form onSubmit={handleSubmit} className="mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 ">
              <div>
                <label className="block mb-3 text-[#FFCA09] font-bold text-lg">First Name *</label>
                <input
                required
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                />
              </div>
              <div>
                <label className="block mb-3 text-[#FFCA09] font-bold text-lg">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                />
              </div>
            </div>
              <div className="mb-6">
                <label className="block mb-3 text-[#FFCA09] font-bold text-xl">Mobile Number *</label>
                <PhoneInput
                required
                  defaultCountry="US"
                  value={formData.phone_number}
                  onChange={handlePhoneChange} 
                  placeholder="+44 12345679"
                  className="w-full px-4 py-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                />
              </div>
            <div className="mb-6">
              <label className="block mb-3 text-[#FFCA09] font-bold text-lg">Email *</label>
              <input
              required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email@example.com"
                className="w-full px-4 py-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-3 text-[#FFCA09] font-bold text-lg">Message</label>
              <textarea
              required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Type Your Message..."
                className="w-full px-4 py-3 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-48 text-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full gap-2 sm:w-[300px] bg-[#FFCA09] hover:bg-yellow-600 text-black py-3 rounded-md font-bold mb-8 mx-auto block text-lg flex justify-center"
            >
              Send Message
              <img src={send_msg} alt="" className="mt-2 w-4"/>
            </button>

            {/* Bottom section - Write Us and Call Us */}
            <div className="flex flex-col sm:flex-row justify-between text-md text-[#515151] mt-6">
              {/* Left - Write Us */}
              <div className="mb-6 sm:mb-0">
                <h4 className="font-bold text-[#FE9901]">Write Us</h4>
                <p className="text-[#8C94A3]">Airport Taxi Travel Solutions Ltd</p>
                <p className="text-[#8C94A3]">3, Viking House, Cheddar Business Park</p>
                <p className="text-[#8C94A3]">Wedmore Road, Cheddar</p>
                <p className="text-[#8C94A3]">BS27 3EB</p>
              </div>
              <div>
                <h4 className="font-bold text-[#FE9901]">Call Us</h4>
                <p className="text-[#8C94A3]">United Kingdom: 0203 4788892</p>
                <p className="text-[#8C94A3]">International: 0044 203 4788892</p>
              </div>
            </div>
      {liveChat && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={handleClose}
          ></div>

          <div className="flex justify-center items-center min-h-screen">
            <LiveChatAdmin onClose={handleClose} />
          </div>
        </div>
      )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
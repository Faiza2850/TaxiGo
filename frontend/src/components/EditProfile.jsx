import React, { useEffect, useState } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { editProfileApi } from "../api/api";
import { getUserById } from "../api/api";
import { BackYellow } from "../assets/index.js";
import { Link } from "react-router-dom";
import backgone from "../assets/backgone.svg";
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });
  const handleChange = (e) => {
   console.log( e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData)
  useEffect(() => {
    const getUser = async () => {
      const response = await getUserById();
      setFormData(response);
    };
    getUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfileApi(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen mt-[-3rem] bg-gray-100 py-12 relative">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-8 sm:p-12 w-full lg:w-[80%] xl:w-[60%] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#333333]">
          TAXIGO
          </h2>
          <p className="text-lg mb-6">Edit Profile</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <span className="text-center p- mb-6 font-size-16px  font-weight-400 text-[#667085] ;">Update Your Detals Like Name, Email, Address, City etc.</span>
            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit First Name *
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="John"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit Last Name *
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit Mobile Number *
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+44 123456789"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit E-mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email@yahoo.com"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit Billing Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="1234 Elm St"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit Post Code *
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder="12345"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-3 text-[#FFCA09] font-bold">
                Edit Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United Kingdom"
                className="w-full p-2 border border-[#7A7979] rounded"
                required
              />
            </div>

            <div className="w-full mt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/profile">
                  <button className=" bg-black text-[#FEB601] p-3 text-lg md:text-xl font-semibold rounded flex items-center justify-center w-full sm:w-[250px] lg:w-[300px]">
                    Back
                    <img
                      src={BackYellow}
                      alt="Back"
                      className="w-4 h-4 mr-2 ml-2"
                    />
                  </button>
                </Link>
                <button className="bg-[#FEB601] text-black p-3 text-lg md:text-xl font-semibold rounded flex items-center justify-center w-full sm:w-[250px] lg:w-[300px]">
                  Update
                  <IoIosCloudDone className="ml-2" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

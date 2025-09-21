import React, { useState } from "react";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TfiBackLeft } from "react-icons/tfi";
import { saveCardDetails } from "../api/api";
import { useParams } from "react-router-dom";
import Back from "../assets/backgone.svg";
import Swal from "sweetalert2";
const CardDetails = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "mobileNumber") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 4) {
        formattedValue = formattedValue.replace(
          /(\d{2})(\d{4})(\d{0,})/,
          "+$1 $2 $3"
        );
      } else if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{0,})/, "+$1 $2");
      }
    } else if (name === "expirationDate") {
      formattedValue = value.replace(/[^0-9]/g, "");
      formattedValue = formattedValue.substring(0, 6);
      if (formattedValue.length >= 3) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{0,4})/, "$1/$2");
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };
  const navigate = useNavigate();
  const confirmOrder = async () => {
    try {
      const cardDetails = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.mobileNumber,
        email: formData.email,
        name_on_card: formData.cardName,
        card_number: formData.cardNumber,
        exp_month: formData.expirationDate.split("/")[0],
        exp_year: formData.expirationDate.split("/")[1],
        cvc: formData.cvv,
        user_id: parseInt(userId, 10), // Assuming userId is available or replace with actual userId
      };
      if(formData.firstName === "" || formData.lastName === "" || formData.mobileNumber === "" || formData.email === "" || formData.cardName === "" || formData.cardNumber === "" || formData.expirationDate === "" || formData.cvv === ""){
        Swal.fire({
          icon: "error",
          title: "All fields are required",
          text: "Please fill in all fields",
        });
        
        return;
      }
      const result = await saveCardDetails(cardDetails);
      navigate(-1);
    } catch (error) {
      console.error("Error confirming card:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-[-6rem] relative">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-12 w-full lg:w-3/4 mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-[#333333]">
          TAXIGO
          </h2>
          <p className="text-md sm:text-lg mb-6">Enter Card Details</p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                Mobile Number *
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+44 12345679"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email@yahoo.com"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                Name on Card *
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="3342 4432 3321 2134"
                className="p-2 border border-gray-300 rounded w-full"
                required
                inputMode="numeric"
                maxLength="19"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">
                Expiration Date *
              </label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/YYYY"
                className="p-2 font-bold rounded w-full border border-gray-300"
                required
                inputMode="numeric"
                maxLength="7"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-[#FFCA09] font-bold">CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="555"
                className="p-2 border border-gray-300 rounded w-full"
                required
                pattern="\d{3,4}"
                maxLength="3"
                inputMode="numeric"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 mx-[50px] ">
              <div className="flex max-sm:flex-col justify-center max-sm:gap-3 md:gap-7 lg:gap-10 mt-8">
                <div onClick={handleBack} className="flex-1">
                  <button className="bg-black text-[#FEB601] p-2 py-3 text-xl font-semibold rounded w-[100%]  flex items-center justify-center">
                    Back
                    <img className="w-4 ml-2 mr-2 mt-1" src={Back} />
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={confirmOrder}
                    className="bg-[#FEB601] text-black p-2 py-3 text-xl font-semibold rounded w-[100%] flex items-center justify-center"
                  >
                    Confirm Card
                    <AiFillCheckCircle className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CardDetails;
import React, { useState } from "react";
import email_icon from "../assets/email.svg";
import { forgetpass } from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Back } from "../assets/index";


function ForgetUserPass() {
  const [email, setEmail] = useState('');

  const handleForgetpass = async () => {
    try {
      const respons= await forgetpass(email);
      console.log(respons)
      Swal.fire({
        title: 'Success!',
        text: 'Please check your email for the password reset link.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FEB601'
      });
    } catch (error) {
      console.log(error.response.data.error)
      const errorMessage = error.response.data.error; 
      Swal.fire({
        title: 'Error!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FEB601'
      });
    }
  };
  const navigate = useNavigate()

  const back = () => {

    navigate(-1);
  }
  return (
    <div>
      <div className="p-10  xl:p-20 xl:pr-40 md:p-8 mt-[-4rem]  md:max-w-7xl bg-white mx-auto  rounded-xl">
        <h1 className="font-bold text-4xl ">TAXIGO</h1>
        <h5 className="text-2xl">Forget Password</h5>
        <p className="text-center md:w-[690px] lg:mx-32 my-[50px] text-[#667085] max-sm:w-[300px] lg:w-[750px] text-xl ">
          To reset your password, Please enter your email. We will send you a link
          to reset your password.
        </p>
        <div className="lg:mx-[200px] md:mx-[200px] max-sm:mx-[30px]">
          <h1 className="text-[#FEB601] font-bold text-xl md:mx-8 lg:mx-[150px]">E-mail</h1>
          <input
            type="email"
            value={email}
            placeholder="email@yahoo.com"
            onChange={(e) => setEmail(e.target.value)}
            className="font-[lato] lg:w-[437px] h-[50px] w-[100%] border md:mx-8 lg:mx-[150px] p-6 my-2 rounded-lg text-[#B3B8C7]"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:mx-6 md:gap-20 mt-10 w-full">
          <button
            onClick={back}
            className="text-black bg-[#FEB601] text-lg font-semibold rounded flex justify-center items-center lg:w-[350px] md:w-[250px] p-2 w-[80%] max-w-xs md:max-w-none mb-4 md:mb-0"
          >
            Back
            <img src={Back} className="ml-2 mr-2 pt-1 w-5 h-5" />
          </button>
          <button
            onClick={handleForgetpass}
            className="bg-black text-[#FEB601] rounded font-semibold lg:text-md flex justify-center items-center lg:w-[350px] md:w-[250px] p-2 w-[80%] max-w-xs md:max-w-none"
          >
            Check your email
            <img src={email_icon} className="ml-4 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetUserPass;

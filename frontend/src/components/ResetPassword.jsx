import React, { useState } from "react";
import Swal from "sweetalert2";
import DoneIcon from '../assets/DoneIcon.svg'
import { useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/api";

function ResetPassword() {
    const queryParams = new URLSearchParams(window.location.search);
    console.log("issue")
    const resettoken = queryParams.get('token');
    const navigate =useNavigate()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPass = async () => {
        if (!newPassword || !confirmPassword) {
            Swal.fire({
              title: 'Error!',
              text: 'Both password fields are required',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#FEB601',
            });
          } else if (newPassword !== confirmPassword) {
            Swal.fire({
              title: 'Error!',
              text: 'Passwords do not match',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#FEB601',
            });
          } else {
            resetPasswordApi(newPassword ,resettoken ,navigate);
            
          }
    };
  return (
    <div>
      <div className="p-10  xl:p-20 xl:pr-40 md:p-8  md:max-w-7xl bg-white mx-auto mt-[-4rem]  rounded-xl">
        <h1 className="font-bold text-4xl ">TAXIGO</h1>
        <h5 className="text-2xl">Reset Password</h5>
        <p className="text-center md:w-[690px] lg:mx-32 my-[50px] text-[#667085] max-sm:w-[300px] lg:w-[750px] text-xl ">
        Please enter new password to reset your new password.
        </p>
        <div className="lg:mx-[300px] md:mx-[230px] max-sm:mx-[40px]">
          <h1 className="text-[#FEB601] font-bold text-xl lg:mx-2">New Password*</h1>
          <input
          
            type="password"
            value={newPassword}
            placeholder="*************"
            onChange={(e) => setNewPassword(e.target.value)}
            className="font-[lato] lg:w-[437px] h-[50px] border p-6 my-2 rounded-lg text-[#B3B8C7]"
          />
          <h1 className="text-[#FEB601] font-bold text-xl lg:mx-2">Confirm New Password*</h1>
          <input
            type="password"
            value={confirmPassword}
            placeholder="*************"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="font-[lato] lg:w-[437px] h-[50px] border p-6 my-2 rounded-lg text-[#B3B8C7]"
          />
          <button onClick={handleResetPass} className="lg:w-[390px] max-sm:w-[250px] md:w-[250px] max-sm:mt-3 md:mt-4 h-[50px] bg-black text-[#FEB601] rounded-lg font-bold lg:text-2xl flex justify-center items-center gap-4 lg:mt-14 lg:mx-6">
            Done
            <img className="ml-3" src={DoneIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
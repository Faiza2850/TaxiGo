import React, { useState } from "react";
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { Adminlogin } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {

    const [LoginEmail, setLoginEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setEmailError("");
        setPasswordError("");
        
        let valid = true;
        if (LoginEmail === "") {
            setEmailError("Email is required");
            valid = false;
        }
        if (LoginPassword === "") {
            setPasswordError("Password is required");
            valid = false;
        }

        if (!valid) return;
        try {
           
            await Adminlogin(LoginEmail, LoginPassword, navigate);

            setLoginEmail("");
            setLoginPassword("");
        
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleClickOutside = (e) => {
        // Prevent propagation for input and button clicks
        e.stopPropagation();
    };

  
    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword); // Toggle between true and false
    };
    return (
        <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-6 max-w-7xl mx-auto" onClick={handleClickOutside}>
            <div className="w-full max-w-7xl bg-white rounded-lg p-8">
                <h1 className="md:text-5xl text-3xl font-bold text-black mb-4">
                TAXIGO
                </h1>
                <p className="text-lg">Admin Login</p>
                <p className="text-sm text-center mb-4 text-[#BDBDBD] max-w-xl mx-auto mt-6">
                   Login to your <span className="font-bold">Admin Account</span>
                </p>
                {errorMessage && (
                    <div className="text-red-600 text-center mb-4">{errorMessage}</div>
                )}

                {/* Login Section */}

                <form onSubmit={handleLogin}>
                    <div className="mb-8">
                        <div className="max-w-md mx-auto">
                            <div className="mb-4">
                                <label className="text-[#FEB601] block font-bold mb-2">
                                    E-mail*
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email@yahoo.com"
                                    className="w-full p-2 border border-[#7A7979] rounded-md"
                                    value={LoginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                                 {emailError && <div className="text-redfive text-sm">{emailError}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="text-[#FEB601] block font-bold mb-2">
                                    Password*
                                </label>
                                <div className="relative">
                                    <input
                                        type={showLoginPassword ? "text" : "password"} // Toggle input type based on state
                                        placeholder="********"
                                        className="w-full p-2 border border-[#7A7979] rounded-md"
                                        value={LoginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleLoginPasswordVisibility} // Toggle password visibility
                                        className="absolute right-2.5 top-2.5 text-[#4b5563]"
                                    >
                                        {showLoginPassword ? <VscEyeClosed className="h-6 w-6" /> : <VscEye className="w-6 h-6" />} {/* Show icon based on state */}
                                    </button>
                                </div>
                                {passwordError && <div className="text-redfive text-sm">{passwordError}</div>}
                            </div>
                        </div>
                        <div className="md:flex justify-center md:gap-20  mt-8">
                            <Link to="/forget-password">
                                <button type="button" className="bg-black text-[#FEB601] md:text-xl p-2 rounded flex w-[30vh] mb-4 md:w-[350px] max-w-md items-center justify-center mr-4">
                                    Forget Password
                                    <FaLock className="mr-2 ml-3" />
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="bg-[#FEB601] text-black md:text-xl p-2 rounded flex w-[30vh] mb-4 md:w-[350px] max-w-md items-center justify-center mr-4"
                            >
                                Log In
                                <FaSignInAlt className="ml-2 mr-2" />
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AdminLogin;

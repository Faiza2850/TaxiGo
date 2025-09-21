// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element, user, role, ...rest }) => {
//   return user?.role === "admin" ? element : <Navigate to="/" />;
// };

// const ProtectedRoute = ({ element, user, role, ...rest }) => {
//   return user?.role === "customer" ? element : <Navigate to="/" />;
// };

// export default PrivateRoute;
// src/components/AdminRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode'; // Correct way
import { AuthContext } from "../context/AuthContext"; // Assuming you have AuthContext for user state

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = Cookies.get("authToken");
  if (!token) {
    // Redirect to login if not logged in
    return <Navigate to="/admin/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Assuming your token contains a "role" field

    // Check if the user is an admin
    if (userRole !== "admin") {
      return <Navigate to="/" />;
    }
    
    return children; // Allow access if the role is admin
  } catch (error) {
    return <Navigate to="/login" />; // If token is invalid or any error, redirect to login
  }
};
export const CustomerRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = Cookies.get("authToken");

  if (!token) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Assuming your token contains a "role" field

    // Check if the user is a customer
    if (userRole !== "customer" && userRole !== "guest" ) {
      return <Navigate to="/" />;
    }
    
    return children; // Allow access if the role is admin
  } catch (error) {
    return <Navigate to="/login" />; // If token is invalid or any error, redirect to login
  }
};

import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // For handling cookies
import {jwtDecode} from 'jwt-decode'; // For decoding JWT
import { Navigate, redirect, useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
// const navigate = useNavigate()
  useEffect(() => {
    // On app load, check for existing token in Cookies
    const token = Cookies.get('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // Save token in cookie
    Cookies.set('authToken', token, { expires: 7 });
    
    // Decode the token to get user info
    const decodedToken = jwtDecode(token);
    
    // Set user state and mark as authenticated
    setUser(decodedToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove token and reset state
    Cookies.remove('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = user?.role === 'admin'; // Assuming the token has a 'role' field

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider
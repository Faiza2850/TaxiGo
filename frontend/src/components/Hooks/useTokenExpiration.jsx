// src/hooks/useTokenExpiration.js

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const useTokenExpiration = () => {
  const checkTokenExpiration = () => {
    const token = Cookies.get("authToken");
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove("authToken");
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenExpiration;

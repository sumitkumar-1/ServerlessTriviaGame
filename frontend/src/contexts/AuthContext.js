import React, { createContext, useContext, useState } from "react";
import { SignOut } from "../apis/apiClient";
import { Login, verifyToken } from "../apis/apis";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const checkLogin = async () => {
    const requestBody = {
      token: localStorage.getItem("AccessToken"),
    };
    const response = await verifyToken(requestBody);
    if (!response?.data?.error) {
      return true;
    } else {
      return false;
    }
  };

  const login = async (user) => {
    const response = await Login(user);
    if (!response?.data?.error) {
      localStorage.setItem(
        "AccessToken",
        response?.data?.AuthenticationResult?.AccessToken
      );
      setUser(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    await SignOut();
    localStorage.clear();
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [sellerStatus, setSellerStatus] = useState(true);

  const [user, setUser] = useState(null)

  const isLoggedIn = () => {
    const isLog = localStorage.getItem("isSignedIn", true);
    return isLog;
  };
  const url = `https://turkey-tm-server.onrender.com/api/v1/users/user-info/me`

  useEffect(() => {
    fetch(url, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("turkey-trade-market")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
  }, [])

  const signIn = () => {
    localStorage.setItem("isSignedIn", true);
    setIsSignedIn(true);
  };

  const signOut = () => {
    localStorage.removeItem("isSignedIn");
    setIsSignedIn(false);
  };
  const sellerStatusAdd = () => {
    setSellerStatus(false);
    localStorage.setItem("sellerStatus", false);
  };
  const contextValue = {
    isSignedIn,
    signIn,
    setIsSignedIn,
    signOut,
    isLoggedIn,
    sellerStatus,
    sellerStatusAdd,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

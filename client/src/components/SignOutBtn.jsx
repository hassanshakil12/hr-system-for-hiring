import React from "react";
import { userLogout } from "../services/API.jsx";

const SignOutBtn = () => {
  const handleOnClick = async () => {
    try {
      const response = await userLogout();

      if (response) {
        localStorage.removeItem("token");
        alert("User logged out successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
  return <button onClick={handleOnClick}>SignOutBtn</button>;
};

export default SignOutBtn;

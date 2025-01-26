import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getCurrentUser } from "../services/API.jsx";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        return setUser(response.data.user);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

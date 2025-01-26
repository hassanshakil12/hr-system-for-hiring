import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext.js";
import "../css/pages.css";
import { SignOutBtn } from "../../components";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return (
    <div className="page-section">
      <div className="page-layout">
        <div className="page-container">
          <h1>Dashboard</h1>
          <h2>Welcome {userData?.username}</h2>
          <SignOutBtn />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

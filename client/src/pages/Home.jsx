import React from "react";
import "./css/pages.css";
import Dashboard  from "./dashboard/Dashboard.jsx";
import {NavLink} from "react-router-dom";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <>
      <div className="page-section">
        <div className="page-layout">
          <div className="page-container">
            <h1>Default Home</h1>
            <NavLink to={"/login"}>Login Now</NavLink>
            <br />
            <NavLink to={"/register"}>Register Now</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h1>Navbar</h1>
      <span>
        <Link to={"/"}>Home</Link>
      </span>
      <span>
        <Link to={"/feed"}>Feed</Link>
      </span>
      <span>
        <Link to={"/search"}>Search</Link>
      </span>
      <span>
        <Link to={"/profile"}>Profile</Link>
      </span>
      <span>
        <Link to={"/settings"}>Settings</Link>
      </span>
    </>
  );
};

export default Navbar; 

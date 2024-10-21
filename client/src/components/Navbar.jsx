import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h1>Navbar</h1>
      <h3>
        <Link to={"/"}>Home</Link>
      </h3>
      <h3>
        <Link to={"/profile"}>Profile</Link>
      </h3>
    </>
  );
};

export default Navbar;

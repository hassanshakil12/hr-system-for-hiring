import React from "react";
import "./css/components.css";
import { NavLink } from "react-router-dom";
import { CgMenu } from "react-icons/cg";

const ProfileCard = () => {
  const handleOnClick = () => {
    const menu = document.querySelector(".profile-card-menu ul");
    menu.classList.toggle("active");
  };
  return (
    <>
      <div className="profile-card-component">
        <div className="profile-card-image">
          <img
            src="/images/profile-image.jpg"
            alt="profile img"
            loading="lazy"
          />
        </div>

        <div className="profile-card-menu">
          <i onClick={handleOnClick}>
            <CgMenu />
          </i>
          <ul>
            <li>
              <NavLink to={""}>Profile</NavLink>
            </li>
            <li>
              <NavLink to={""}>Settings</NavLink>
            </li>
            <li>
              <NavLink to={""}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

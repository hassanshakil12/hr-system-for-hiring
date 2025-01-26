import React, { useState, useContext, useReducer, useEffect } from "react";
import "./css/components.css";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdWorkOutline } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FiInbox } from "react-icons/fi";
import { PiOfficeChairBold } from "react-icons/pi";
import { MdContentPasteSearch } from "react-icons/md";
import { GrTestDesktop } from "react-icons/gr";
import { MdOutlineFindInPage } from "react-icons/md";

import UserContext from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [entityType, setEntityType] = useState(null);

  useEffect(() => {
    if (user?.entityType) {
      setEntityType(user.entityType);
    }
  }, [user]);

  const getMenuItems = (entityType) => {
    switch (entityType) {
      case "candidate":
        return (
          <>
            <div className="navbar-main-menu">
              <h2>Main Menu</h2>
              <ul>
                <li>
                  <NavLink to={"/"}>
                    <i>
                      <RxDashboard />
                    </i>
                    <p>Dashboard</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/feed"}>
                    <i>
                      <MdOutlineFindInPage />
                    </i>
                    <p>Find Job</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/applications"}>
                    <i>
                      <MdContentPasteSearch />
                    </i>
                    <p>Applications</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <GrTestDesktop />
                    </i>
                    <p>Test & Interview</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "recruiter":
        return (
          <>
            <div className="navbar-main-menu">
              <h2>Main Menu</h2>
              <ul>
                <li>
                  <NavLink to={"/dashboard"}>
                    <i>
                      <RxDashboard />
                    </i>
                    <p>Dashboard</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdWorkOutline />
                    </i>
                    <p>Jobs</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdPayment />
                    </i>
                    <p>Payment</p>
                  </NavLink>
                </li>
              </ul>
            </div>

            <hr />

            <div className="navbar-secondary-menu">
              <h2>Recruitment</h2>
              <ul>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdOutlineCreateNewFolder />
                    </i>
                    <p>Create Job</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <FiInbox />
                    </i>
                    <p>Application Hub</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <PiOfficeChairBold />
                    </i>
                    <p>Interviews</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );

      case "organization":
        return (
          <>
            <div className="navbar-main-menu">
              <h2>Main Menu</h2>
              <ul>
                <li>
                  <NavLink to={"/dashboard"}>
                    <i>
                      <RxDashboard />
                    </i>
                    <p>Dashboard</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdWorkOutline />
                    </i>
                    <p>Jobs</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdPayment />
                    </i>
                    <p>Payment</p>
                  </NavLink>
                </li>
              </ul>
            </div>

            <hr />

            <div className="navbar-secondary-menu">
              <h2>Recruitment</h2>
              <ul>
                <li>
                  <NavLink to={""}>
                    <i>
                      <MdOutlineCreateNewFolder />
                    </i>
                    <p>Create Job</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <FiInbox />
                    </i>
                    <p>Application Hub</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""}>
                    <i>
                      <PiOfficeChairBold />
                    </i>
                    <p>Interviews</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        );
    }
  };
  return (
    <>
      <nav>
        <div className="navbar-layout">
          <div className="navbar-container">
            <div className="navbar-menu">
              <div className="navbar-logo">
                <img src="" alt="logo" loading="lazy" />
                <h2>ProCruiter</h2>
              </div>
              {entityType ? getMenuItems(entityType) : <h1>Loading...</h1>}
            </div>

            <div className="navbar-help">
              <h2>
                <NavLink to={""}>Need Help?</NavLink>
              </h2>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

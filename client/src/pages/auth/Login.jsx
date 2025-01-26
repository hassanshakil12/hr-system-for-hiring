import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext.js";
import "./css/Login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { userLogin } from "../../services/API.jsx";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    entityType: "",
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      // console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(userData);
      console.log(response);
      localStorage.setItem("token", response.data.jwtToken);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("User Login Failed");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-page-layout">
          <div className="login-page-container">
            <div className="login-form-image">
              <img src="/images/user.png" alt="Avatar" loading="lazy" />
            </div>
            <h1>Login</h1>

            <form onSubmit={handleOnSubmit} method="POST">
              <div className="login-form-inputs">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email*"
                  required
                  onChange={handleOnChange}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password*"
                  required
                  onChange={handleOnChange}
                />
                <Link to={"/"}>Forgot Password?</Link>
              </div>

              <div className="login-categories">
                <div className="login-category">
                  <input
                    type="radio"
                    name="entityType"
                    id="candidate"
                    value="candidate"
                    required
                    onChange={handleOnChange}
                  />
                  <label htmlFor="candidate">Candidate</label>
                </div>
                <div className="login-category">
                  <input
                    type="radio"
                    name="entityType"
                    id="recruiter"
                    value="recruiter"
                    required
                    onChange={handleOnChange}
                  />
                  <label htmlFor="recruiter">Recruiter</label>
                </div>
                <div className="login-category">
                  <input
                    type="radio"
                    name="entityType"
                    id="organization"
                    value="organization"
                    required
                    onChange={handleOnChange}
                  />
                  <label htmlFor="organization">Organization</label>
                </div>
              </div>

              <div className="login-form-buttons">
                <button type="submit">
                  <p>
                    <i>
                      <RiLoginCircleFill />
                    </i>
                    Sign In{" "}
                  </p>
                </button>
                <p>
                  Don't have an Account?{" "}
                  <NavLink to={"/register"}>Sign Up</NavLink>
                </p>

                <p>
                  ----------------- <span>OR</span> -----------------
                </p>

                <div className="secondary-login-buttons">
                  <Link to={"https://mail.google.com/"}>
                    Continue With{" "}
                    <i>
                      <FcGoogle />
                    </i>
                  </Link>
                  <Link to={"https://github.com/"}>
                    Continue With{" "}
                    <i>
                      <FaGithub />
                    </i>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

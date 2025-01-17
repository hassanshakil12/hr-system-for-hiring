import React, { useState } from "react";
import "./css/register.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { register } from "../../services/API.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    entityType: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("User registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(`err: ${err}`);
    }
  };
  return (
    <>
      <div className="register-page">
        <div className="register-page-layout">
          <div className="register-page-container">
            <div className="register-text-content">
              <h2>Welcome To ProCruiter</h2>
              <p>Your trusted partner in finding talent and careers.</p>
            </div>

            <form method="POST" onSubmit={handleOnSubmit}>
              <div className="register-form-inputs">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username*"
                  required
                  onChange={handleOnChange}
                />
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
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password*"
                  required
                />
              </div>

              <div className="register-categories">
                <div className="register-category">
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
                <div className="register-category">
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
                <div className="register-category">
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

              <div className="register-form-buttons">
                <button type="submit">
                  <p>
                    <i>
                      <RiLoginCircleFill />
                    </i>
                    Sign Up{" "}
                  </p>
                </button>
                <p>
                  Already have an Account?{" "}
                  <NavLink to={"/login"}>Sign in</NavLink>
                </p>

                <p>
                  ----------------- <span>OR</span> -----------------
                </p>

                <div className="secondary-register-buttons">
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

export default Register;

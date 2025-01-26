import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/API.jsx";

const CreateJob = () => {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      if (e.target.name === "requirements") {
        const values = e.target.value.split(" ");
        setUserData({ ...userData, requirements: values });
      } else {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      }
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJob(userData);
      console.log(response);
      alert("Job Created Successfully");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
  return (
    <div>
      <form action="" method="POST" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleOnChange}
          required
        />
        <textarea
          placeholder="Job Description"
          name="description"
          onChange={handleOnChange}
          required
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Job Location"
          onChange={handleOnChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Job Salary"
          onChange={handleOnChange}
          required
        />
        <input
          type="text"
          name="requirements"
          placeholder="Job Requirements"
          onChange={handleOnChange}
          required
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;

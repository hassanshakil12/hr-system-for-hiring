import React, { useState, useEffect } from "react";
import { getAllRecruiters } from "../../services/API.jsx";
import { NavLink } from "react-router-dom";

const HireRecruiter = () => {
  const [recruiters, setRecruiters] = useState(null);
  useEffect(() => {
    const fetchAllRecruiters = async () => {
      try {
        const response = await getAllRecruiters();
        if (response.data.success) {
          setRecruiters(response.data.recruiters);
        }
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchAllRecruiters();
  }, []);

  return (
    <div>
      {recruiters ? (
        recruiters.map((recruiter) => (
          <div key={recruiter._id}>
            <h3>{recruiter.username}</h3>
            <p>{recruiter.email}</p>
            <NavLink to={`/hire-recruiter/${recruiter._id}`}>
              Hire Recruiter
            </NavLink>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default HireRecruiter;

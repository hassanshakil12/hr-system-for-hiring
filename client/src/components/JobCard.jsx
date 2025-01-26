import React from "react";
import { NavLink } from "react-router-dom";

const JobCard = ({ data }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.salary}</p>
      {data.requirements.map((requirement, idx) => (
        <p key={idx}>{requirement}</p>
      ))}
      <NavLink to={`/apply-to-job/${data._id}`}>Apply-to-job</NavLink>
    </div>
  );
};

export default JobCard;

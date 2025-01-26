import React from "react";

const JobCard = ({ data }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.salary}</p>
      {data.requirements.map((requirement, idx) => (
        <p key={idx}>{requirement}</p>
      ))}
    </div>
  );
};

export default JobCard;

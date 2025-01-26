import React, { useState, useEffect } from "react";
import { getOrganizationJobs } from "../../services/API.jsx";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await getOrganizationJobs();
        setMyJobs(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchMyJobs();
  }, []);
  return (
    <div>
      {myJobs ? (
        myJobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.salary}</p>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default MyJobs;

import React, { useState, useEffect } from "react";
import { getApplications } from "../../services/API";

const Applications = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.data.applications);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchApplications();
  }, []);
  return (
    <div>
      {applications ? (
        applications.map((application) => (
          <div key={application._id}>
            <h3>{application.job.title}</h3>
            <h3>{application.job.salary}</h3>
            <h3>{application.cv}</h3>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Applications;

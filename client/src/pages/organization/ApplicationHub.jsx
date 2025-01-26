import React, { useState, useEffect } from "react";
import { getJobApplications } from "../../services/API.jsx";

const ApplicationHub = () => {
  const [applications, setApplications] = useState(null);
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await getJobApplications();
        if (response.data.success) {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchJobApplications();
  }, []);

  return (
    <div>
      {applications ? (
        applications.map((application) => (
          <div key={application._id}>
            <h3>{application.job?.title}</h3>
            <p>{application.candidate?.username}</p>
            <p>{application.organization?.username}</p>
          </div>
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default ApplicationHub;

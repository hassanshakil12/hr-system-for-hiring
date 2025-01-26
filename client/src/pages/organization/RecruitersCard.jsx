import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hireRecruiter, getJobs } from "../../services/API.jsx";

const RecruitersCard = () => {
  const { recruiterId } = useParams();
  const [jobs, setJobs] = useState(null);
  const [data, setData] = useState({
    recruiterId,
    jobId: "",
    note: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        if (response.data.success) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchJobs();
  }, []);

  const handleOnChange = (e) => {
    try {
      setData({ ...data, note: e.target.value });
      console.log(data);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await hireRecruiter(data);
      console.log(response);
      //   setJobs(null);
      //   setData(null);
      alert("Hire Request Sent");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
  return (
    <div>
      <form method="post" onSubmit={handleOnSubmit}>
        <textarea name="note" onChange={handleOnChange} required></textarea>
        {jobs ? (
          jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => setData({ ...data, jobId: job._id })}
            >
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.salary}</p>
              <p>{job._id}</p>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
        <button type="submit">Send Hire Request</button>
      </form>
    </div>
  );
};

export default RecruitersCard;

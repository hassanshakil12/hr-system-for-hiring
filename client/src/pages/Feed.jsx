import React, { useEffect, useState } from "react";
import { getJobs } from "../services/API.jsx";
import { JobCard } from "../components";

const Feed = () => {
  const [jobPosts, setJobPosts] = useState(null);
  useEffect(() => {
    const getJobPosts = async () => {
      try {
        const response = await getJobs();
        setJobPosts(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    getJobPosts();
  }, []);

  return (
    <div>
      {jobPosts ? (
        jobPosts.map((jobPost) => <JobCard key={jobPost._id} data={jobPost} />)
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Feed;

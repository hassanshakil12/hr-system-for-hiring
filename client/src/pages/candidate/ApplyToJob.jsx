import React, { useState } from "react";
import { userApplyToJob } from "../../services/API.jsx";
import { useNavigate, useParams } from "react-router-dom";

const ApplyToJob = () => {
  const [userData, setUserData] = useState({
    coverLetter: "",
    cv: "",
  });
  const { job } = useParams();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      setUserData({ ...userData, coverLetter: e.target.value });
      console.log(userData);
    } catch (error) {
      console.error(error?.response.date || error);
    }
  };

  const handleOnChangeCV = (e) => {
    if (e.target.files[0]) {
      setUserData({ ...userData, cv: e.target.files[0] });
      console.log(userData);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!userData.cv) return;

    const formData = new FormData();
    formData.append("coverLetter", userData.coverLetter);
    formData.append("cv", userData.cv);
    try {
      const response = await userApplyToJob({ formData, job });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error?.response.date || error);
    }
  };
  return (
    <div>
      <form
        action=""
        method="POST"
        onSubmit={handleOnSubmit}
        type="multipart/form-data"
      >
        <textarea
          name="coverletter"
          placeholder="Cover Leter..."
          onChange={handleOnChange}
          required
        ></textarea>
        <input type="file" onChange={handleOnChangeCV} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyToJob;

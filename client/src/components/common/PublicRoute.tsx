import { JSX } from "react";
import { Navigate } from "react-router-dom";

const getUserData = () => {
  try {
    const token = localStorage.getItem("userAuthToken");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return { role: payload.role };
  } catch (err) {
    return null;
  }
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = getUserData();

  if (user) {
    switch (user.role) {
      case "organization":
        return <Navigate to="/organization-dashboard" replace />;
      case "recruiter":
        return <Navigate to="/recruiter-dashboard" replace />;
      case "candidate":
        return <Navigate to="/candidate-dashboard" replace />;
      default:
        return <Navigate to="/signin" replace />;
    }
  }

  return children;
};

export default PublicRoute;

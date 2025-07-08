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

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: string[];
}) => {
  const user = getUserData();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;

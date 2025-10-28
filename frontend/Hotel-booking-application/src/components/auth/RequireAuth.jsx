
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("userRoles") || "[]");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  if (allowedRoles && !roles.some(r => allowedRoles.includes(r))) {
    return <Navigate to="/" state={{ message: "Access denied" }} />;
  }

  return children;
};

export default RequireAuth;

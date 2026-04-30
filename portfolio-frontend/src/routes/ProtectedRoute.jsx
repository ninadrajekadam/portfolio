import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const token = userInfo?.token;

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
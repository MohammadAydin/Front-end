import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromLocalStorage();
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;

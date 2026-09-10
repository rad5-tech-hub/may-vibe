import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

export default function UserProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

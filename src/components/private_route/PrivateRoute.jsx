import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { currentUser } = useAuth();

  return !currentUser ? <Navigate to="/signup" /> : <Outlet />;
}

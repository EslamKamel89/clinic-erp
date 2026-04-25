import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/auth.store";

const RequireAuth = () => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;

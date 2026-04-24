import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = null; // this is placeholder for the token. token will be in zustand store.
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;

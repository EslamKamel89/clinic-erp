import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = null; // this is placeholder for the token. token will be fetched from cache if it exist then i could go to protected routes if not i will be redirected to login page.
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default RequireAuth;

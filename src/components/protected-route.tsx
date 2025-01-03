import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;  // Check if the user is authenticated
  redirect?: string;         // Custom redirect route when not authenticated
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  redirect = "/login",  // Default to redirecting to the login page
}: Props) => {
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) return <Navigate to={redirect} />;

  // If authenticated, return the children or Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

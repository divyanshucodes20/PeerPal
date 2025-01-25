import type { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  children?: ReactElement
  isAuthenticated: boolean // Checks if user is logged in
  isVerified: boolean // Checks if user is verified
  redirect?: string // Custom redirect when not authorized
}

const ProtectedRoute = ({
  isAuthenticated,
  isVerified,
  children,
  redirect = "/login", // Default redirect to login
}: ProtectedRouteProps) => {
  // If user is not logged in or not verified, redirect to login
  if (!isAuthenticated || !isVerified) return <Navigate to={redirect} replace />

  // If authenticated and verified, render children or outlet for nested routes
  return children ? children : <Outlet />
}

export default ProtectedRoute


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// src/components/PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EmployerDashboard from "../pages/EmployerDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";

export default function PrivateRoute() {
  const { user, role, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  if (role === "employer") return <EmployerDashboard />;
  if (role === "employee") return <EmployeeDashboard />;
  return <p>Unauthorized Role</p>;
}

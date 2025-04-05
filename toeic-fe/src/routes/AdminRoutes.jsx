import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import PrivateRoute from "./PrivateRoute";

const AdminRoutes = ({ role }) => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute
            element={<AdminDashboard />}
            role={role}
            requiredRole="admin"
          />
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute
            element={<UserManagement />}
            role={role}
            requiredRole="admin"
          />
        }
      />
    </Routes>
  );
};

export default AdminRoutes;

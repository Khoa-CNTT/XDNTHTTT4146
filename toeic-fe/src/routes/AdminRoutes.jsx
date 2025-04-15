import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import PrivateRoute from "./PrivateRoute";

<<<<<<< HEAD
const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  },
  // Có thể thêm nhiều route khác sau này
];

const AdminRoutes = ({ role }) => {
  return (
    <Routes>
      {adminRoutes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <PrivateRoute element={element} role={role} requiredRole="Admin" />
          }
        />
      ))}
=======
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
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    </Routes>
  );
};

export default AdminRoutes;

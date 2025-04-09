import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/StudentPage";
import MyCourses from "../pages/student/MyCourses";
import PrivateRoute from "./PrivateRoute";

const StudentRoutes = ({ role }) => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PrivateRoute
            element={<StudentDashboard />}
            role={role}
            requiredRole={["student"]} // Mảng vai trò có thể mở rộng sau này
          />
        }
      />
      <Route
        path="/student/my-courses"
        element={
          <PrivateRoute
            element={<MyCourses />}
            role={role}
            requiredRole={["student"]} // Mảng vai trò có thể mở rộng sau này
          />
        }
      />
    </Routes>
  );
};

export default StudentRoutes;

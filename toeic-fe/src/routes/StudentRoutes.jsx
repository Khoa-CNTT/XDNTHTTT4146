import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import StudentDashboard from "../pages/StudentPage";
=======
import StudentDashboard from "../pages/student/StudentDashboard";
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
import MyCourses from "../pages/student/MyCourses";
import PrivateRoute from "./PrivateRoute";

const StudentRoutes = ({ role }) => {
  return (
    <Routes>
      <Route
<<<<<<< HEAD
        path=""
=======
        path="/student/dashboard"
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
        element={
          <PrivateRoute
            element={<StudentDashboard />}
            role={role}
<<<<<<< HEAD
            requiredRole={["student"]} // Mảng vai trò có thể mở rộng sau này
=======
            requiredRole="student"
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
          />
        }
      />
      <Route
        path="/student/my-courses"
        element={
          <PrivateRoute
            element={<MyCourses />}
            role={role}
<<<<<<< HEAD
            requiredRole={["student"]} // Mảng vai trò có thể mở rộng sau này
=======
            requiredRole="student"
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
          />
        }
      />
    </Routes>
  );
};

export default StudentRoutes;

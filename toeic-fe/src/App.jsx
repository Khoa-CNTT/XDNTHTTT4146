import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VocabularyGarden from "./pages/VocabularyGarden";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import TowerPage from "./pages/TowerPage";
import TestingPage from "./pages/TestingPage";
import MyCourses from "./pages/MyCourses";
import ManageCourses from "./pages/ManageCourses";

import CourseManagement from "./pages/admin/CourseManagement";
import UserManagement from "./pages/admin/UserManagement";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/admin/AdminLayout";

import "./index.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavRoutes = ["/login", "/forgot-password"];
  const hideNavbar =
    noNavRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/garden" element={<VocabularyGarden />} />
          <Route path="/tower" element={<TowerPage />} />
          <Route path="/testing" element={<TestingPage />} />

          {/* Student & Teacher Pages */}
          <Route
            path="/student"
            element={
              <PrivateRoute requiredRole="Student" element={<StudentPage />} />
            }
          />
          <Route
            path="/student/courses"
            element={
              <PrivateRoute requiredRole="Student" element={<MyCourses />} />
            }
          />
          <Route
            path="/teacher"
            element={
              <PrivateRoute requiredRole="Teacher" element={<TeacherPage />} />
            }
          />
          <Route
            path="/teacher/manage-courses"
            element={
              <PrivateRoute
                requiredRole="Teacher"
                element={<ManageCourses />}
              />
            }
          />

          {/* Admin routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requiredRole="Admin" element={<Dashboard />} />
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <PrivateRoute
                requiredRole="Admin"
                element={
                  <AdminLayout>
                    <UserManagement />
                  </AdminLayout>
                }
              />
            }
          />
          <Route
            path="/admin/course-management"
            element={
              <PrivateRoute
                requiredRole="Admin"
                element={
                  <AdminLayout>
                    <CourseManagement />
                  </AdminLayout>
                }
              />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

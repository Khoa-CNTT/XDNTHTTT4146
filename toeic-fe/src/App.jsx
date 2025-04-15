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
<<<<<<< HEAD
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VocabularyGarden from "./pages/VocabularyGarden";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import PeakTower from "./pages/TowerPage";
import ResetPassword from "./pages/auth/ResetPassword";
import TestingPage from "./pages/TestingPage";
import TowerPage from "./pages/TowerPage";
import CourseManagement from "./pages/admin/CourseManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminLayout from "./components/admin/AdminLayout";

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
=======
import StudentDashboard from "./pages/StudentPage";
import TeacherDashboard from "./pages/TeacherPage";
import ManageCourses from "./pages/ManageCourses";
import MyCourses from "./pages/MyCourses";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar /> && <Footer />}
      {children}
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
<<<<<<< HEAD
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/garden" element={<VocabularyGarden />} />
          <Route path="/tower" element={<PeakTower />} />
          <Route path="/testing" element={<TestingPage />} />

          {/* Protected routes */}
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

          <Route
            path="/student"
            element={
              <PrivateRoute requiredRole="Student" element={<StudentPage />} />
            }
          />
          <Route
            path="/teacher"
            element={
              <PrivateRoute requiredRole="Teacher" element={<TeacherPage />} />
            }
          />

          {/* Fallback */}
=======
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/manage-courses" element={<ManageCourses />} />
          <Route path="/student/courses" element={<MyCourses />} />
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Navbar.css";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-teal-600 tracking-wide">TOEIC</h1>

      {/* Nav items */}
      <div className="space-x-6 flex items-center">
        <Link to="/courses" className="nav-link">
          Courses
        </Link>
        <Link to="/tower" className="nav-link">
          Tower
        </Link>
        <Link to="/garden" className="nav-link">
          Garden
        </Link>

        {/* Dropdown */}
        <div className="relative group">
          <button className="nav-link">TOEIC</button>
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
            <Link to="/toeic/reading" className="dropdown-item">
              Reading
            </Link>
            <Link to="/toeic/listening" className="dropdown-item">
              Listening
            </Link>
          </div>
        </div>

        <Link to="/testing" className="nav-link">
          Testing
        </Link>
      </div>

      {/* Sign Up */}
      <Link to="/login">
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-200">
=======

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">TOEIC</h1>
      <div className="space-x-6">
        <Link to="/courses" className="text-gray-600 hover:text-black">
          Courses
        </Link>
        <Link to="/tower" className="text-gray-600 hover:text-black">
          Tower
        </Link>
        <Link to="/garden" className="text-gray-600 hover:text-black">
          Garden
        </Link>
        <Link to="/toeic" className="text-gray-600 hover:text-black">
          Toeic
        </Link>
        <Link to="/testing" className="text-gray-600 hover:text-black">
          Testing
        </Link>
      </div>
      <Link to="/login">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
          Sign Up
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;

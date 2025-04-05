import React from "react";
import { Link } from "react-router-dom";

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
          Sign Up
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;

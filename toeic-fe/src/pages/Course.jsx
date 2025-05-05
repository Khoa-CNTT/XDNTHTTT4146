import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courseApi";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Course Lists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link
              to={`/courses/${course.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;

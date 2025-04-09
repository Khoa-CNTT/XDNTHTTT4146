import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courseApi";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Danh sách khóa học</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link
              to={`/courses/${course.id}`}
              className="text-blue-600 hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;

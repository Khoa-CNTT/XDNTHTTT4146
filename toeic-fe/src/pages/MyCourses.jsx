import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Có lỗi khi tải danh sách khóa học!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Xử lý xóa khóa học
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) return;

    try {
      const { data } = await deleteCourse(courseId);
      if (data.deleteCourse.success) {
        toast.success("Khóa học đã được xóa!");
        setCourses(courses.filter((course) => course.id !== courseId)); // Cập nhật UI
      } else {
        toast.error("Xóa thất bại: " + data.deleteCourse.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa khóa học", error);
    }
  };

  return (
    <div className="manage-courses-container">
      <h1>Quản lý Khóa học</h1>
      <Link to="/admin/add-course">
        <Button variant="primary">Thêm Khóa học Mới</Button>
      </Link>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : courses.length === 0 ? (
        <p>Không có khóa học nào.</p>
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <Card key={course.id} className="course-card">
              <CardContent>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="card-actions">
                  <Link to={`/admin/edit-course/${course.id}`}>
                    <Button variant="secondary">Chỉnh sửa</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Xóa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourses;

const CourseService = require("../services/courseService");

const CourseResolver = {
  Query: {
    getAllCourses: async () => {
      try {
        const courses = await CourseService.getAll({});
        return courses;
      } catch (err) {
        console.error(err);
        throw new Error("Không thể lấy danh sách khóa học.");
      }
    },
    getCourseById: async (_, { id }) => {
      try {
        const course = await CourseService.getById(id);
        if (!course) throw new Error("Không tìm thấy khóa học.");
        return course;
      } catch (err) {
        console.error(err);
        throw new Error("Lỗi khi lấy khóa học.");
      }
    },
  },
  Mutation: {
    createCourse: async (_, { input }) => {
      try {
        const course = await CourseService.create(input);
        return {
          success: true,
          message: "Tạo khóa học thành công.",
          course,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          course: null,
        };
      }
    },
    updateCourse: async (_, { id, input }) => {
      try {
        const course = await CourseService.update(id, input);
        if (!course)
          return {
            success: false,
            message: "Không tìm thấy khóa học để cập nhật.",
            course: null,
          };
        return {
          success: true,
          message: "Cập nhật khóa học thành công.",
          course,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          course: null,
        };
      }
    },
    deleteCourse: async (_, { id }) => {
      try {
        const course = await CourseService.delete(id);
        if (!course)
          return {
            success: false,
            message: "Không tìm thấy khóa học để xoá.",
            course: null,
          };
        return {
          success: true,
          message: "Xoá khóa học thành công.",
          course,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          course: null,
        };
      }
    },
  },
};

module.exports = CourseResolver;

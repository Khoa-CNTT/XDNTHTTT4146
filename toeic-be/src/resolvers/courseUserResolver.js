const CourseUserService = require("../services/courseUserService");

const CourseUserResolver = {
  Query: {
    getUserCourses: async (_, { userId }) => {
      return await CourseUserService.getByUser(userId);
    },
    getCourseUsers: async (_, { courseId }) => {
      return await CourseUserService.getByCourse(courseId);
    },
  },
  Mutation: {
    enrollCourse: async (_, { input }) => {
      try {
        const courseUser = await CourseUserService.enroll(input);
        return {
          success: true,
          message: "Đăng ký khóa học thành công.",
          courseUser,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          courseUser: null,
        };
      }
    },
    updateCourseUser: async (_, { id, input }) => {
      try {
        const courseUser = await CourseUserService.update(id, input);
        if (!courseUser) {
          return {
            success: false,
            message: "Không tìm thấy dữ liệu.",
            courseUser: null,
          };
        }
        return {
          success: true,
          message: "Cập nhật thông tin học viên thành công.",
          courseUser,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          courseUser: null,
        };
      }
    },
  },
};

module.exports = CourseUserResolver;

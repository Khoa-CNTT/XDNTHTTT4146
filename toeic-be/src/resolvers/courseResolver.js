const { Course, Lesson } = require("../../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const courseResolver = {
  Query: {
    getAllCourses: async (_, { level, isActive, limit = 20, offset = 0 }) => {
      try {
        const where = {};
        if (level) where.level = level;
        if (typeof isActive === "boolean") where.isActive = isActive;

        return await Course.findAll({
          where,
          include: [{ model: Lesson, as: "lessons" }],
          order: [["createdAt", "DESC"]],
          limit,
          offset,
        });
      } catch (error) {
        throw new Error("Lỗi khi lấy danh sách khoá học: " + error.message);
      }
    },

    getCourseById: async (_, { id }) => {
      try {
        const course = await Course.findByPk(id, {
          include: [{ model: Lesson, as: "lessons" }],
        });
        if (!course) throw new UserInputError("Không tìm thấy khoá học.");
        return course;
      } catch (error) {
        throw new Error("Lỗi khi lấy khoá học: " + error.message);
      }
    },
  },

  Mutation: {
    createCourse: async (_, { input }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new AuthenticationError("Bạn không có quyền.");
      }

      try {
        const existed = await Course.findOne({ where: { name: input.name } });
        if (existed) {
          throw new UserInputError("Tên khoá học đã tồn tại.");
        }

        const course = await Course.create(input);
        return {
          success: true,
          message: "Tạo khoá học thành công.",
          course,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          course: null,
        };
      }
    },

    updateCourse: async (_, { id, input }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new AuthenticationError("Bạn không có quyền.");
      }

      try {
        const course = await Course.findByPk(id);
        if (!course) {
          return {
            success: false,
            message: "Khoá học không tồn tại.",
            course: null,
          };
        }

        await course.update(input);

        return {
          success: true,
          message: "Cập nhật khoá học thành công.",
          course,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          course: null,
        };
      }
    },

    deleteCourse: async (_, { id }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new AuthenticationError("Bạn không có quyền.");
      }

      try {
        const course = await Course.findByPk(id);
        if (!course) {
          return {
            success: false,
            message: "Khoá học không tồn tại.",
            course: null,
          };
        }

        await course.destroy();
        return {
          success: true,
          message: "Xoá khoá học thành công.",
          course,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          course: null,
        };
      }
    },
  },

  Course: {
    lessons: async (course) => {
      return await Lesson.findAll({ where: { courseId: course.id } });
    },
  },
};

module.exports = courseResolver;

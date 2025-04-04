const { Lesson, Course } = require("../models"); // Import model Lesson & Course
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const lessonResolver = {
  Query: {
    /**
     * Lấy danh sách tất cả bài học
     */
    getLessons: async () => {
      try {
        return await Lesson.findAll({
          include: [{ model: Course, as: "course" }],
          order: [["createdAt", "DESC"]],
        });
      } catch (error) {
        throw new Error("Lỗi khi lấy danh sách bài học: " + error.message);
      }
    },

    /**
     * Lấy bài học theo ID
     */
    getLessonById: async (_, { id }) => {
      try {
        const lesson = await Lesson.findByPk(id, {
          include: [{ model: Course, as: "course" }],
        });
        if (!lesson) throw new UserInputError("Không tìm thấy bài học.");
        return lesson;
      } catch (error) {
        throw new Error("Lỗi khi lấy bài học: " + error.message);
      }
    },
  },

  Mutation: {
    /**
     * Tạo bài học mới
     */
    createLesson: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const { title, content, courseId } = input;

        // Kiểm tra khóa học tồn tại
        const course = await Course.findByPk(courseId);
        if (!course) throw new UserInputError("Khóa học không tồn tại.");

        // Tạo bài học
        const newLesson = await Lesson.create({
          title,
          content,
          courseId,
        });

        return {
          status: true,
          msg: "Bài học đã được tạo thành công!",
          lesson: newLesson,
        };
      } catch (error) {
        throw new Error("Lỗi khi tạo bài học: " + error.message);
      }
    },
    // Cập nhật bài học
    updateLesson: async (_, { id, input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) throw new UserInputError("Bài học không tồn tại.");

        await lesson.update(input);

        return {
          status: true,
          msg: "Bài học đã được cập nhật thành công!",
          lesson,
        };
      } catch (error) {
        throw new Error("Lỗi khi cập nhật bài học: " + error.message);
      }
    },

    //Xóa bài học
    deleteLesson: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) throw new UserInputError("Bài học không tồn tại.");

        await lesson.destroy();

        return {
          status: true,
          msg: "Bài học đã được xóa thành công!",
        };
      } catch (error) {
        throw new Error("Lỗi khi xóa bài học: " + error.message);
      }
    },
  },
};

module.exports = lessonResolver;

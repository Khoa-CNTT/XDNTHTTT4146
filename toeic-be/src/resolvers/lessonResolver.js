const lessonService = require("../../services/lessonService");

const lessonResolver = {
  Query: {
    getLessonById: (_, { id }) => lessonService.getLessonById(id),
    getLessonsByCourse: (_, { courseId }) =>
      lessonService.getLessonsByCourse(courseId),
    getLessonsByType: (_, { type }) => lessonService.getLessonsByType(type),
  },

  Mutation: {
    createLesson: async (_, { input }) => {
      try {
        const lesson = await lessonService.createLesson(input);
        return {
          success: true,
          message: "Lesson created successfully",
          lesson,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          lesson: null,
        };
      }
    },

    updateLesson: async (_, { id, input }) => {
      try {
        const lesson = await lessonService.updateLesson(id, input);
        if (!lesson) throw new Error("Lesson not found");
        return {
          success: true,
          message: "Lesson updated successfully",
          lesson,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          lesson: null,
        };
      }
    },

    deleteLesson: async (_, { id }) => {
      try {
        const lesson = await lessonService.deleteLesson(id);
        if (!lesson) throw new Error("Lesson not found");
        return {
          success: true,
          message: "Lesson deleted successfully",
          lesson,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          lesson: null,
        };
      }
    },
  },
};

module.exports = { lessonResolver };

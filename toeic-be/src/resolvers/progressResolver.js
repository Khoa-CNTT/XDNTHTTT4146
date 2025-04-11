const { Progress, User, Lesson } = require("../../models");

const progressResolver = {
  Query: {
    getProgressByUser: async (_, { userId }) => {
      return await Progress.findAll({
        where: { userId },
        include: ["lesson"],
        order: [["updatedAt", "DESC"]],
      });
    },
    getProgressByLesson: async (_, { lessonId }) => {
      return await Progress.findAll({
        where: { lessonId },
        include: ["user"],
      });
    },
    getProgress: async (_, { userId, lessonId }) => {
      return await Progress.findOne({
        where: { userId, lessonId },
        include: ["user", "lesson"],
      });
    },
  },

  Mutation: {
    createProgress: async (_, { input }) => {
      try {
        const [progress, created] = await Progress.findOrCreate({
          where: { userId: input.userId, lessonId: input.lessonId },
          defaults: input,
        });

        if (!created) {
          return {
            success: false,
            message: "Progress already exists.",
            progress,
          };
        }

        return {
          success: true,
          message: "Progress created successfully.",
          progress,
        };
      } catch (error) {
        console.error("Create Progress Error:", error);
        return {
          success: false,
          message: "Failed to create progress.",
          progress: null,
        };
      }
    },

    updateProgress: async (_, { userId, lessonId, input }) => {
      try {
        const progress = await Progress.findOne({
          where: { userId, lessonId },
        });

        if (!progress) {
          return {
            success: false,
            message: "Progress not found.",
            progress: null,
          };
        }

        await progress.update(input);

        return {
          success: true,
          message: "Progress updated successfully.",
          progress,
        };
      } catch (error) {
        console.error("Update Progress Error:", error);
        return {
          success: false,
          message: "Failed to update progress.",
          progress: null,
        };
      }
    },

    deleteProgress: async (_, { userId, lessonId }) => {
      try {
        const progress = await Progress.findOne({
          where: { userId, lessonId },
        });

        if (!progress) return false;
        await progress.destroy();
        return true;
      } catch (error) {
        console.error("Delete Progress Error:", error);
        return false;
      }
    },
  },

  Progress: {
    user: async (parent) => {
      return await User.findByPk(parent.userId);
    },
    lesson: async (parent) => {
      return await Lesson.findByPk(parent.lessonId);
    },
  },
};

module.exports = progressResolver;

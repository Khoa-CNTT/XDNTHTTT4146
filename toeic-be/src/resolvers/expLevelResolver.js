const { ExpLevel } = require("../../models/mysql");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const ExpLevelService = require("../../services/ExpLevelService");

const expLevelResolver = {
  Query: {
    getAllExpLevels: async () => {
      try {
        return await ExpLevel.findAll({
          order: [["level", "ASC"]],
        });
      } catch (error) {
        throw new Error(
          "Lỗi khi lấy danh sách cấp độ kinh nghiệm: " + error.message
        );
      }
    },

    getExpLevel: async (_, { level }) => {
      try {
        const expLevel = await ExpLevel.findOne({ where: { level } });
        if (!expLevel) throw new UserInputError("Không tìm thấy cấp độ.");
        return expLevel;
      } catch (error) {
        throw new Error("Lỗi khi lấy cấp độ: " + error.message);
      }
    },

    getNextExpLevel: async (_, { currentLevel }) => {
      try {
        const nextLevel = await ExpLevel.findOne({
          where: { level: currentLevel + 1 },
        });
        if (!nextLevel) return null;
        return nextLevel;
      } catch (error) {
        throw new Error("Lỗi khi lấy cấp độ tiếp theo: " + error.message);
      }
    },

    // ✅ BỔ SUNG CHUẨN CHỈ Ở ĐÂY
    getMyLevelProgress: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const progress = await ExpLevelService.calculateUserLevelProgress(
          user.id
        );
        return {
          currentLevel: progress.currentLevel,
          nextLevel: progress.nextLevel,
          currentExp: progress.currentExp,
          expToNextLevel: progress.expToNextLevel,
          progressRatio: progress.progressRatio,
        };
      } catch (error) {
        throw new Error("Lỗi khi lấy tiến độ cấp độ: " + error.message);
      }
    },
  },

  Mutation: {
    createExpLevel: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const existed = await ExpLevel.findOne({
          where: { level: input.level },
        });
        if (existed) {
          return {
            success: false,
            message: "Cấp độ đã tồn tại.",
            expLevel: null,
          };
        }

        const expLevel = await ExpLevel.create(input);
        return {
          success: true,
          message: "Tạo cấp độ thành công!",
          expLevel,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi tạo cấp độ: " + error.message,
          expLevel: null,
        };
      }
    },

    updateExpLevel: async (_, { level, input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const expLevel = await ExpLevel.findOne({ where: { level } });
        if (!expLevel) {
          return {
            success: false,
            message: "Cấp độ không tồn tại.",
            expLevel: null,
          };
        }

        await expLevel.update(input);
        return {
          success: true,
          message: "Cập nhật cấp độ thành công!",
          expLevel,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi cập nhật cấp độ: " + error.message,
          expLevel: null,
        };
      }
    },

    deleteExpLevel: async (_, { level }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const expLevel = await ExpLevel.findOne({ where: { level } });
        if (!expLevel) {
          return {
            success: false,
            message: "Cấp độ không tồn tại.",
            expLevel: null,
          };
        }

        await expLevel.destroy();
        return {
          success: true,
          message: "Xoá cấp độ thành công!",
          expLevel,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi xoá cấp độ: " + error.message,
          expLevel: null,
        };
      }
    },
  },
};

module.exports = expLevelResolver;

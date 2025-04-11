const { Vocabulary } = require("../../models/mysql");
const { Op } = require("sequelize");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const vocabularyResolver = {
  Query: {
    // Lấy toàn bộ từ vựng có thể kèm phân trang
    getAllVocabulary: async (_, { limit = 100, offset = 0 }) => {
      try {
        return await Vocabulary.findAll({
          limit,
          offset,
          order: [["createdAt", "DESC"]],
        });
      } catch (error) {
        throw new Error("Lỗi khi lấy danh sách từ vựng: " + error.message);
      }
    },

    // Lấy từ vựng theo ID
    getVocabularyById: async (_, { id }) => {
      const vocabulary = await Vocabulary.findByPk(id);
      if (!vocabulary) throw new UserInputError("Không tìm thấy từ vựng.");
      return vocabulary;
    },

    // Tìm kiếm từ vựng theo từ khóa
    searchVocabulary: async (_, { keyword }) => {
      try {
        return await Vocabulary.findAll({
          where: {
            word: {
              [Op.like]: `%${keyword}%`,
            },
          },
          order: [["createdAt", "DESC"]],
        });
      } catch (error) {
        throw new Error("Lỗi khi tìm kiếm từ vựng: " + error.message);
      }
    },

    // Lọc từ vựng theo level
    getVocabularyByLevel: async (_, { level }) => {
      try {
        return await Vocabulary.findAll({
          where: { level },
          order: [["createdAt", "DESC"]],
        });
      } catch (error) {
        throw new Error("Lỗi khi lọc từ vựng: " + error.message);
      }
    },
  },

  Mutation: {
    // Tạo mới từ vựng
    createVocabulary: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const vocabulary = await Vocabulary.create(input);
        return {
          success: true,
          message: "Tạo từ vựng thành công!",
          vocabulary,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi tạo từ vựng: " + error.message,
          vocabulary: null,
        };
      }
    },

    // Cập nhật từ vựng
    updateVocabulary: async (_, { id, input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const vocabulary = await Vocabulary.findByPk(id);
        if (!vocabulary) throw new UserInputError("Từ vựng không tồn tại.");

        await vocabulary.update(input);
        return {
          success: true,
          message: "Cập nhật từ vựng thành công!",
          vocabulary,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi cập nhật từ vựng: " + error.message,
          vocabulary: null,
        };
      }
    },

    // Xoá từ vựng
    deleteVocabulary: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const vocabulary = await Vocabulary.findByPk(id);
        if (!vocabulary) throw new UserInputError("Từ vựng không tồn tại.");

        await vocabulary.destroy();
        return {
          success: true,
          message: "Xoá từ vựng thành công!",
          vocabulary,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi khi xoá từ vựng: " + error.message,
          vocabulary: null,
        };
      }
    },
  },
};

module.exports = vocabularyResolver;

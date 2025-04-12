const { MockResult } = require("../../models/mysql");
const { GraphQLError } = require("graphql");

const mockResultService = {
  async createMockResult(input) {
    try {
      const result = await MockResult.create(input);
      return result;
    } catch (err) {
      throw new GraphQLError(`Không thể tạo MockResult: ${err.message}`);
    }
  },

  async updateMockResult(id, input) {
    const result = await MockResult.findByPk(id);
    if (!result) throw new GraphQLError("Không tìm thấy MockResult");

    try {
      await result.update(input);
      return result;
    } catch (err) {
      throw new GraphQLError(`Không thể cập nhật MockResult: ${err.message}`);
    }
  },

  async deleteMockResult(id) {
    const result = await MockResult.findByPk(id);
    if (!result) throw new GraphQLError("Không tìm thấy MockResult");

    try {
      await result.destroy();
      return true;
    } catch (err) {
      throw new GraphQLError(`Không thể xoá MockResult: ${err.message}`);
    }
  },

  async getMockResultById(id) {
    const result = await MockResult.findByPk(id);
    if (!result) throw new GraphQLError("Không tìm thấy MockResult");
    return result;
  },

  async getAllMockResults() {
    return await MockResult.findAll({ order: [["createdAt", "DESC"]] });
  },

  async getMockResultsByUser(userId) {
    return await MockResult.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
  },
};

module.exports = mockResultService;

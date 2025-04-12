const { Level } = require("../models/mysql");
const { GraphQLError } = require("graphql");

const levelService = {
  async createLevel(input) {
    try {
      const level = await Level.create(input);
      return level;
    } catch (err) {
      throw new GraphQLError(`Không thể tạo level: ${err.message}`);
    }
  },

  async updateLevel(id, input) {
    const level = await Level.findByPk(id);
    if (!level) throw new GraphQLError("Không tìm thấy level");

    try {
      await level.update(input);
      return level;
    } catch (err) {
      throw new GraphQLError(`Không thể cập nhật level: ${err.message}`);
    }
  },

  async deleteLevel(id) {
    const level = await Level.findByPk(id);
    if (!level) throw new GraphQLError("Không tìm thấy level");

    try {
      await level.destroy();
      return true;
    } catch (err) {
      throw new GraphQLError(`Không thể xoá level: ${err.message}`);
    }
  },

  async restoreLevel(id) {
    const level = await Level.findOne({ where: { id }, paranoid: false });
    if (!level) throw new GraphQLError("Không tìm thấy level đã xoá");

    try {
      await level.restore();
      return level;
    } catch (err) {
      throw new GraphQLError(`Không thể phục hồi level: ${err.message}`);
    }
  },

  async getLevelById(id) {
    const level = await Level.findByPk(id);
    if (!level) throw new GraphQLError("Không tìm thấy level");
    return level;
  },

  async getLevelByTargetScore(targetScore) {
    const level = await Level.findOne({ where: { targetScore } });
    if (!level)
      throw new GraphQLError("Không tìm thấy level với targetScore này");
    return level;
  },

  async getAllLevels() {
    return await Level.findAll({ order: [["order", "ASC"]] });
  },
};

module.exports = levelService;

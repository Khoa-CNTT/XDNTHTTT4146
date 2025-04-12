const { Mission } = require("../models/mysql");
const { GraphQLError } = require("graphql");

const missionService = {
  async createMission(input) {
    try {
      const mission = await Mission.create(input);
      return mission;
    } catch (err) {
      throw new GraphQLError(`Không thể tạo mission: ${err.message}`);
    }
  },

  async updateMission(id, input) {
    const mission = await Mission.findByPk(id);
    if (!mission) throw new GraphQLError("Không tìm thấy mission");

    try {
      await mission.update(input);
      return mission;
    } catch (err) {
      throw new GraphQLError(`Không thể cập nhật mission: ${err.message}`);
    }
  },

  async deleteMission(id) {
    const mission = await Mission.findByPk(id);
    if (!mission) throw new GraphQLError("Không tìm thấy mission");

    try {
      await mission.destroy();
      return true;
    } catch (err) {
      throw new GraphQLError(`Không thể xoá mission: ${err.message}`);
    }
  },

  async getMissionById(id) {
    const mission = await Mission.findByPk(id);
    if (!mission) throw new GraphQLError("Không tìm thấy mission");
    return mission;
  },

  async getAllMissions() {
    return await Mission.findAll({ order: [["createdAt", "DESC"]] });
  },

  async getActiveMissions() {
    return await Mission.findAll({
      where: { isActive: true },
      order: [["createdAt", "ASC"]],
    });
  },
};

module.exports = missionService;

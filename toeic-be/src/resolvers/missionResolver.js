const { Mission, Reward } = require("../models/mysql");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const missionResolver = {
  Query: {
    /**
     * Danh sách nhiệm vụ có phân trang, lọc
     */
    getMissions: async (_, { type, activeOnly, limit = 20, offset = 0 }) => {
      try {
        const where = {};
        if (type) where.type = type;
        if (activeOnly) where.isActive = true;

        const missions = await Mission.findAll({
          where,
          order: [["createdAt", "DESC"]],
          limit,
          offset,
          include: [{ model: Reward, as: "reward" }],
        });

        return missions;
      } catch (error) {
        throw new Error("Lỗi khi lấy danh sách nhiệm vụ: " + error.message);
      }
    },

    /**
     * Chi tiết nhiệm vụ theo ID
     */
    getMissionById: async (_, { id }) => {
      try {
        const mission = await Mission.findByPk(id, {
          include: [{ model: Reward, as: "reward" }],
        });
        if (!mission) throw new UserInputError("Không tìm thấy nhiệm vụ.");
        return mission;
      } catch (error) {
        throw new Error("Lỗi khi lấy nhiệm vụ: " + error.message);
      }
    },
  },

  Mutation: {
    /**
     * Tạo nhiệm vụ mới (có thể kèm rewardId)
     */
    createMission: async (_, { input }, { user }) => {
      if (!user || user.role !== "admin")
        throw new AuthenticationError("Bạn không có quyền.");

      try {
        const mission = await Mission.create(input);
        return {
          status: true,
          msg: "Tạo nhiệm vụ thành công!",
          mission,
        };
      } catch (error) {
        throw new Error("Lỗi khi tạo nhiệm vụ: " + error.message);
      }
    },

    /**
     * Cập nhật nhiệm vụ
     */
    updateMission: async (_, { id, input }, { user }) => {
      if (!user || user.role !== "admin")
        throw new AuthenticationError("Bạn không có quyền.");

      try {
        const mission = await Mission.findByPk(id);
        if (!mission) throw new UserInputError("Nhiệm vụ không tồn tại.");

        await mission.update(input);
        return {
          status: true,
          msg: "Cập nhật nhiệm vụ thành công!",
          mission,
        };
      } catch (error) {
        throw new Error("Lỗi khi cập nhật nhiệm vụ: " + error.message);
      }
    },

    /**
     * Soft delete nhiệm vụ
     */
    deleteMission: async (_, { id }, { user }) => {
      if (!user || user.role !== "admin")
        throw new AuthenticationError("Bạn không có quyền.");

      try {
        const mission = await Mission.findByPk(id);
        if (!mission) throw new UserInputError("Nhiệm vụ không tồn tại.");

        await mission.destroy(); // paranoid: true nên chỉ soft-delete
        return {
          status: true,
          msg: "Xóa nhiệm vụ thành công!",
        };
      } catch (error) {
        throw new Error("Lỗi khi xóa nhiệm vụ: " + error.message);
      }
    },
  },

  Mission: {
    reward: async (mission) => {
      if (!mission.rewardId) return null;
      return await Reward.findByPk(mission.rewardId);
    },
  },
};

module.exports = missionResolver;

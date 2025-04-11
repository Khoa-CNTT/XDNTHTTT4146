const { Reward } = require("../../models");

const rewardResolver = {
  Query: {
    getAllRewards: async (_, { activeOnly }) => {
      const where = activeOnly ? { is_active: true } : {};
      return await Reward.findAll({ where });
    },

    getRewardById: async (_, { id }) => {
      return await Reward.findByPk(id, {
        include: [
          "userRewards",
          "missions",
          "missionsRewarded",
          "users",
          "paymentRewards",
        ],
      });
    },
  },

  Mutation: {
    createReward: async (_, { input }) => {
      return await Reward.create(input);
    },

    updateReward: async (_, { id, input }) => {
      const reward = await Reward.findByPk(id);
      if (!reward) throw new Error("Reward not found");
      await reward.update(input);
      return reward;
    },

    deleteReward: async (_, { id }) => {
      const reward = await Reward.findByPk(id);
      if (!reward) return false;
      await reward.destroy();
      return true;
    },
  },

  Reward: {
    userRewards: (reward) => reward.getUserRewards(),
    missions: (reward) => reward.getMissions(),
    missionsRewarded: (reward) => reward.getMissionsRewarded(),
    users: (reward) => reward.getUsers(),
    paymentRewards: (reward) => reward.getPaymentRewards(),
  },
};

module.exports = rewardResolver;

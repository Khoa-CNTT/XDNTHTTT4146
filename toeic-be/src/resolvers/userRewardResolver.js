const { UserReward, User, Reward } = require("../../models");

const userRewardResolver = {
  Query: {
    getUserRewards: async (_, { userId }) => {
      return await UserReward.findAll({
        where: { userId },
        include: ["user", "reward"],
      });
    },

    getUserRewardById: async (_, { id }) => {
      return await UserReward.findByPk(id, {
        include: ["user", "reward"],
      });
    },
  },

  Mutation: {
    createUserReward: async (_, { input }) => {
      const existing = await UserReward.findOne({
        where: {
          userId: input.userId,
          rewardId: input.rewardId,
          sourceType: input.sourceType,
          sourceId: input.sourceId,
        },
      });

      if (existing) {
        throw new Error("UserReward already exists for this source");
      }

      return await UserReward.create(input);
    },

    deleteUserReward: async (_, { id }) => {
      const reward = await UserReward.findByPk(id);
      if (!reward) return false;
      await reward.destroy();
      return true;
    },
  },

  UserReward: {
    user: (userReward) => userReward.getUser(),
    reward: (userReward) => userReward.getReward(),
  },
};

module.exports = userRewardResolver;

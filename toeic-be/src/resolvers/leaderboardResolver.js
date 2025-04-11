const Leaderboard = require("../../models/mongo/Leaderboard");

const leaderboardResolver = {
  Query: {
    getLeaderboard: async (_, { filter }) => {
      const query = {};

      if (filter.type) query.type = filter.type;
      if (filter.scope) query.scope = filter.scope;
      if (filter.scopeId) query.scopeId = filter.scopeId;
      if (filter.period) query.period = filter.period;

      return await Leaderboard.find(query).sort({ rank: 1 });
    },

    getUserRank: async (_, { userId, filter }) => {
      const query = { userId };

      if (filter.type) query.type = filter.type;
      if (filter.scope) query.scope = filter.scope;
      if (filter.scopeId) query.scopeId = filter.scopeId;
      if (filter.period) query.period = filter.period;

      return await Leaderboard.findOne(query);
    },
  },

  Leaderboard: {
    id: (doc) => doc._id.toString(),
  },
};

module.exports = leaderboardResolver;

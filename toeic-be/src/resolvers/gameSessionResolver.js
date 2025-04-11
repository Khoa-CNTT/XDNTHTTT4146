const GameSession = require("../../models/mongo/GameSession");

const gameSessionResolvers = {
  Query: {
    getGameSessionsByUser: async (_, { userId }) => {
      return await GameSession.find({ userId });
    },
    getGameSessionsByGame: async (_, { gameId }) => {
      return await GameSession.find({ gameId });
    },
  },
  Mutation: {
    createGameSession: async (_, { input }) => {
      try {
        const session = await GameSession.create(input);
        return {
          success: true,
          message: "Session created successfully",
          session,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          session: null,
        };
      }
    },
  },
};

module.exports = gameSessionResolvers;

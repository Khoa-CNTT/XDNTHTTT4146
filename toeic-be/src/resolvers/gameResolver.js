const { Game, User } = require("../../models");

const gameResolver = {
  Query: {
    games: async () => {
      try {
        return await Game.findAll({ order: [["createdAt", "DESC"]] });
      } catch (err) {
        throw new Error("Failed to fetch games");
      }
    },

    game: async (_, { id }) => {
      try {
        const game = await Game.findByPk(id);
        if (!game) throw new Error("Game not found");
        return game;
      } catch (err) {
        throw new Error("Failed to fetch game");
      }
    },

    gamesByUser: async (_, { userId }) => {
      try {
        return await Game.findAll({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
      } catch (err) {
        throw new Error("Failed to fetch user's games");
      }
    },
  },

  Mutation: {
    createGame: async (_, { input }) => {
      try {
        const game = await Game.create(input);
        return game;
      } catch (err) {
        throw new Error("Failed to create game");
      }
    },

    updateGame: async (_, { id, input }) => {
      try {
        const game = await Game.findByPk(id);
        if (!game) throw new Error("Game not found");

        await game.update(input);
        return game;
      } catch (err) {
        throw new Error("Failed to update game");
      }
    },

    deleteGame: async (_, { id }) => {
      try {
        const game = await Game.findByPk(id);
        if (!game) {
          return {
            success: false,
            message: "Game not found",
            game: null,
          };
        }

        await game.destroy();
        return {
          success: true,
          message: "Game deleted successfully",
          game,
        };
      } catch (err) {
        return {
          success: false,
          message: "Failed to delete game",
          game: null,
        };
      }
    },
  },

  Game: {
    user: async (parent) => {
      return await User.findByPk(parent.userId);
    },
    sessions: async (parent, _, { GameSession }) => {
      return await GameSession.find({ gameId: parent.id });
    },
  },
};

module.exports = gameResolver;

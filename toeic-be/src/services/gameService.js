const { Game, User } = require("../models/mysql");
const { Op } = require("sequelize");

/**
 * Tạo game mới
 * @param {Object} data - { userId, name, description, score?, status?, startDate? }
 */
const createGame = async (data) => {
  return await Game.create(data);
};

/**
 * Lấy tất cả game của 1 người dùng
 * @param {string} userId
 * @param {Object} [filter]
 */
const getGamesByUser = async (userId, filter = {}) => {
  return await Game.findAll({
    where: {
      userId,
      ...filter,
    },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Lấy 1 game theo ID
 * @param {string} gameId
 */
const getGameById = async (gameId) => {
  return await Game.findByPk(gameId, {
    include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
  });
};

/**
 * Cập nhật thông tin game
 * @param {string} gameId
 * @param {Object} updateData
 */
const updateGame = async (gameId, updateData) => {
  const game = await Game.findByPk(gameId);
  if (!game) throw new Error("Game not found");

  await game.update(updateData);
  return game;
};

/**
 * Xoá mềm game
 * @param {string} gameId
 */
const deleteGame = async (gameId) => {
  const game = await Game.findByPk(gameId);
  if (!game) throw new Error("Game not found");

  await game.destroy();
  return true;
};

/**
 * Lấy các game theo trạng thái
 * @param {"active"|"completed"|"paused"} status
 */
const getGamesByStatus = async (status) => {
  return await Game.findAll({
    where: { status },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Lấy top game có điểm cao nhất (leaderboard mini)
 * @param {number} limit
 */
const getTopGames = async (limit = 10) => {
  return await Game.findAll({
    where: {
      status: "completed",
    },
    order: [["score", "DESC"]],
    limit,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

module.exports = {
  createGame,
  getGamesByUser,
  getGameById,
  updateGame,
  deleteGame,
  getGamesByStatus,
  getTopGames,
};

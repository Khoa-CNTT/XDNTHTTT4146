const GameSession = require("../models/mongodb/GameSession");

/**
 * Tạo mới một phiên chơi game
 * @param {Object} data - Thông tin phiên chơi game
 * @returns {Promise<GameSession>}
 */
const createGameSession = async (data) => {
  const newSession = new GameSession(data);
  return await newSession.save();
};

/**
 * Lấy các phiên chơi game theo userId
 * @param {string} userId
 * @returns {Promise<GameSession[]>}
 */
const getGameSessionsByUser = async (userId) => {
  return await GameSession.find({ userId }).sort({ createdAt: -1 });
};

/**
 * Lấy các phiên chơi game theo gameId (từ bảng Game MySQL)
 * @param {string} gameId
 * @returns {Promise<GameSession[]>}
 */
const getGameSessionsByGameId = async (gameId) => {
  return await GameSession.find({ gameId }).sort({ createdAt: -1 });
};

/**
 * Lấy một phiên chơi game theo ID
 * @param {string} sessionId
 * @returns {Promise<GameSession|null>}
 */
const getGameSessionById = async (sessionId) => {
  return await GameSession.findById(sessionId);
};

/**
 * Cập nhật kết quả hoặc trạng thái phiên chơi game
 * @param {string} sessionId
 * @param {Object} updateData
 */
const updateGameSession = async (sessionId, updateData) => {
  return await GameSession.findByIdAndUpdate(sessionId, updateData, {
    new: true,
  });
};

/**
 * Xoá một phiên chơi game (nếu cần)
 * @param {string} sessionId
 */
const deleteGameSession = async (sessionId) => {
  return await GameSession.findByIdAndDelete(sessionId);
};

module.exports = {
  createGameSession,
  getGameSessionsByUser,
  getGameSessionsByGameId,
  getGameSessionById,
  updateGameSession,
  deleteGameSession,
};

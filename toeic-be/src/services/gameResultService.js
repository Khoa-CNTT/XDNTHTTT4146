const { GameResult, User, Game } = require("../models/mysql");
const { addExp, addCoin } = require("./UserRewardService");

const GameResultService = {
  async submit(userId, input) {
    const exp = Math.floor(input.score * 0.5); // ví dụ: 1 điểm = 0.5 exp
    const coin = Math.floor(input.score * 0.3); // ví dụ: 1 điểm = 0.3 xu

    const result = await GameResult.create({
      userId,
      gameId: input.gameId,
      score: input.score,
      duration: input.duration,
      status: input.status,
      expEarned: exp,
      coinEarned: coin,
    });

    await addExp(userId, exp, "Game");
    await addCoin(userId, coin, "Game");

    return result;
  },

  async getByUser(userId) {
    return await GameResult.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },

  async getById(id) {
    return await GameResult.findByPk(id);
  },
};

module.exports = GameResultService;

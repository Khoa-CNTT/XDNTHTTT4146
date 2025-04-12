const { ExpLevel, ExpHistory, User } = require("../models");

const ExpLevelService = {
  async getLevelFromExp(totalExp) {
    const levels = await ExpLevel.findAll({
      order: [["requiredExp", "ASC"]],
    });

    let currentLevel = levels[0];
    for (const level of levels) {
      if (totalExp >= level.requiredExp) {
        currentLevel = level;
      } else {
        break;
      }
    }

    return currentLevel;
  },

  async getNextLevel(currentLevelNumber) {
    return await ExpLevel.findOne({
      where: { level: currentLevelNumber + 1 },
    });
  },

  async getAllLevels() {
    return await ExpLevel.findAll({
      order: [["level", "ASC"]],
    });
  },

  async getTotalExp(userId) {
    const result = await ExpHistory.findAll({
      where: { userId },
      attributes: ["exp"],
    });

    return result.reduce((sum, record) => sum + record.exp, 0);
  },

  async calculateUserLevelProgress(userId) {
    const totalExp = await this.getTotalExp(userId);
    const currentLevel = await this.getLevelFromExp(totalExp);
    const nextLevel = await this.getNextLevel(currentLevel.level);

    const expToNextLevel = nextLevel ? nextLevel.requiredExp - totalExp : null;

    const progressRatio = nextLevel
      ? Math.min(
          1,
          (totalExp - currentLevel.requiredExp) /
            (nextLevel.requiredExp - currentLevel.requiredExp)
        )
      : 1; // Max level

    return {
      currentLevel,
      nextLevel,
      currentExp: totalExp,
      expToNextLevel,
      progressRatio,
    };
  },
};

module.exports = ExpLevelService;

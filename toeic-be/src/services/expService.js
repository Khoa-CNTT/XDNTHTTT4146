const { ExpLevel, ExpHistory } = require("../models/mysql");

/**
 * Lấy cấp độ hiện tại từ tổng EXP
 */
const getUserLevelFromExp = async (currentExp) => {
  const levels = await ExpLevel.findAll({
    order: [["requiredExp", "ASC"]],
  });

  let level = 1;
  for (let i = 0; i < levels.length; i++) {
    if (currentExp >= levels[i].requiredExp) {
      level = levels[i].level;
    } else break;
  }
  return level;
};

/**
 * Lấy thông tin cấp độ tiếp theo và tiến độ
 */
const getNextLevelInfo = async (currentExp) => {
  const levels = await ExpLevel.findAll({
    order: [["requiredExp", "ASC"]],
  });

  let currentLevel = 1;
  let nextLevel = null;
  let requiredExpNext = null;

  for (let i = 0; i < levels.length; i++) {
    if (currentExp >= levels[i].requiredExp) {
      currentLevel = levels[i].level;
      if (i + 1 < levels.length) {
        nextLevel = levels[i + 1].level;
        requiredExpNext = levels[i + 1].requiredExp;
      }
    } else break;
  }

  let progressPercent = 100;
  if (requiredExpNext !== null) {
    const prevExp =
      levels.find((e) => e.level === currentLevel)?.requiredExp || 0;
    progressPercent =
      ((currentExp - prevExp) / (requiredExpNext - prevExp)) * 100;
  }

  return {
    currentLevel,
    nextLevel,
    requiredExpNext,
    progressPercent: Math.min(100, Math.round(progressPercent)),
  };
};

/**
 * Ghi log EXP
 */
async function awardExp({
  userId,
  source,
  sourceId = null,
  vocabularyId = null,
  exp,
  description = null,
  metadata = null,
}) {
  return await ExpHistory.create({
    userId,
    source,
    sourceId,
    vocabularyId,
    exp,
    description,
    metadata,
  });
}

module.exports = {
  getUserLevelFromExp,
  getNextLevelInfo,
  awardExp,
};

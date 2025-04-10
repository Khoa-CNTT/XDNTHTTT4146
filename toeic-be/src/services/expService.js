const { Exp } = require("../models/mysql");

const getUserLevelFromExp = async (currentExp) => {
  const expLevels = await Exp.findAll({
    order: [["requiredExp", "ASC"]],
  });

  let level = 1;

  for (let i = 0; i < expLevels.length; i++) {
    if (currentExp >= expLevels[i].requiredExp) {
      level = expLevels[i].level;
    } else {
      break;
    }
  }

  return level;
};

module.exports = {
  getUserLevelFromExp,
};

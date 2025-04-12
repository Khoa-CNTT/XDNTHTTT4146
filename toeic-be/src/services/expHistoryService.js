const { ExpHistory } = require("../models");
const { Op } = require("sequelize");

const ExpHistoryService = {
  create: async (input) => {
    return await ExpHistory.create(input);
  },

  getUserHistory: async (filter) => {
    const where = { userId: filter.userId };
    if (filter.source) where.source = filter.source;
    if (filter.fromDate || filter.toDate) {
      where.createdAt = {};
      if (filter.fromDate) where.createdAt[Op.gte] = filter.fromDate;
      if (filter.toDate) where.createdAt[Op.lte] = filter.toDate;
    }

    return await ExpHistory.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
  },
};

module.exports = ExpHistoryService;

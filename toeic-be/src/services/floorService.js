const { Floor, MiniGame } = require("../models");

class FloorService {
  // Lấy tất cả Floors của 1 Tower
  static async getAllFloorsByTowerId(towerId) {
    try {
      return await Floor.findAll({
        where: { towerId },
        include: [{ model: MiniGame, as: "miniGame" }],
      });
    } catch (error) {
      throw new Error("Error fetching Floors by Tower ID");
    }
  }

  // Tạo Floor mới
  static async createFloor({ towerId, floor, miniGameId, toeicScore }) {
    try {
      return await Floor.create({ towerId, floor, miniGameId, toeicScore });
    } catch (error) {
      throw new Error("Error creating Floor");
    }
  }
}

module.exports = FloorService;

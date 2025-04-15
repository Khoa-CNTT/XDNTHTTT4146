const { MasteryRoad } = require("../models");

class MasteryRoadService {
  // Lấy tất cả mastery roads theo courseId (nếu có)
  static async getMasteryRoads(courseId) {
    const condition = courseId ? { where: { courseId } } : {};
    return await MasteryRoad.findAll(condition);
  }

  // Lấy MasteryRoad theo ID
  static async getMasteryRoadById(id) {
    return await MasteryRoad.findByPk(id);
  }

  // Tạo MasteryRoad mới
  static async createMasteryRoad({
    name,
    description,
    courseId,
    towerId,
    gardenId,
    difficultyLevel,
    status,
  }) {
    return await MasteryRoad.create({
      name,
      description,
      courseId,
      towerId,
      gardenId,
      difficultyLevel,
      status,
    });
  }

  // Cập nhật MasteryRoad
  static async updateMasteryRoad({
    id,
    name,
    description,
    courseId,
    towerId,
    gardenId,
    difficultyLevel,
    status,
  }) {
    const masteryRoad = await MasteryRoad.findByPk(id);
    if (masteryRoad) {
      masteryRoad.name = name;
      masteryRoad.description = description;
      masteryRoad.courseId = courseId;
      masteryRoad.towerId = towerId;
      masteryRoad.gardenId = gardenId;
      masteryRoad.difficultyLevel = difficultyLevel;
      masteryRoad.status = status;
      await masteryRoad.save();
      return masteryRoad;
    }
    throw new Error("MasteryRoad not found");
  }

  // Xóa MasteryRoad
  static async deleteMasteryRoad(id) {
    const masteryRoad = await MasteryRoad.findByPk(id);
    if (masteryRoad) {
      await masteryRoad.destroy();
      return true;
    }
    throw new Error("MasteryRoad not found");
  }
}

module.exports = MasteryRoadService;

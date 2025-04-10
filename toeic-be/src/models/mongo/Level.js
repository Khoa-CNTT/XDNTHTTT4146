const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    levelName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    targetScore: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    studyGoal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

LevelSchema.index({ levelName: 1 });

class LevelClass {
  /**
   * Lấy danh sách toàn bộ các cấp độ
   */
  static async getAllLevels() {
    return this.find().sort({ targetScore: 1 });
  }

  /**
   * Tìm cấp độ phù hợp với điểm số của người học
   */
  static async findLevelByScore(score) {
    return this.findOne({ targetScore: { $lte: score } }).sort({
      targetScore: -1,
    });
  }
}

LevelSchema.loadClass(LevelClass);

module.exports = mongoose.model("Level", LevelSchema);

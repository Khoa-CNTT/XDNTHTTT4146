const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql").sequelize;

class Level extends Model {}

Level.init(
  {
    levelName: { type: DataTypes.STRING, allowNull: false }, // Tên tầng
    targetScore: { type: DataTypes.INTEGER, allowNull: false }, // Điểm TOEIC tương ứng
    description: { type: DataTypes.TEXT, allowNull: false }, // Mô tả tầng học
    studyGoal: { type: DataTypes.TEXT, allowNull: false }, // Mục tiêu học tập
  },
  {
    sequelize,
    tableName: "levels",
    timestamps: true,
  }
);

module.exports = Level;

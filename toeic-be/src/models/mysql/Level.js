const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Level extends Model {}

Level.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // Tên cấp độ phải có độ dài từ 3 đến 50 ký tự
      },
    },
    targetScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Điểm mục tiêu không nhỏ hơn 0
        max: 990, // Điểm mục tiêu không lớn hơn 990
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    studyGoal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Mặc định yêu cầu 0 kinh nghiệm
    },
    badgeId: {
      type: DataTypes.UUID,
      allowNull: true, // Có thể không có badge
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Đặt mặc định là 0
    },
  },
  {
    sequelize,
    modelName: "Level",
    tableName: "levels",
    timestamps: true,
    paranoid: true, // Cho phép sử dụng soft delete
    indexes: [
      { fields: ["expRequired"] }, // Tạo chỉ mục cho expRequired
      { fields: ["order"] }, // Tạo chỉ mục cho order
    ],
  }
);

module.exports = Level;

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Tower extends Model {
  static associate(models) {
    this.hasMany(models.Game, { foreignKey: "towerId", as: "games" });
    this.hasMany(models.Lesson, { foreignKey: "towerId", as: "lessons" });
    this.hasMany(models.TowerLevel, {
      foreignKey: "towerId",
      as: "towerLevels",
    });
  }
}

Tower.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "Thứ tự hiển thị hoặc unlock theo cấp độ",
    },

    levelRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Yêu cầu level người dùng để mở khóa tower này",
    },

    type: {
      type: DataTypes.ENUM("main", "side", "event", "challenge"),
      defaultValue: "main",
      allowNull: false,
      comment: "Phân loại loại tower",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Tower",
    tableName: "towers",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Tower;

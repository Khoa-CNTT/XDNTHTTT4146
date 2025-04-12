const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Tower extends Model {
  static associate(models) {
    // Quan hệ 1-n với Game
    this.hasMany(models.Game, {
      foreignKey: "towerId",
      as: "games",
      onDelete: "CASCADE", // Xóa các game liên quan khi xóa tower
    });

    // Quan hệ 1-n với Lesson
    this.hasMany(models.Lesson, {
      foreignKey: "towerId",
      as: "lessons",
      onDelete: "CASCADE", // Xóa các lessons liên quan khi xóa tower
    });

    // Quan hệ 1-n với TowerLevel
    this.hasMany(models.TowerLevel, {
      foreignKey: "towerId",
      as: "towerLevels",
      onDelete: "CASCADE", // Xóa các tower levels liên quan khi xóa tower
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
      validate: {
        notEmpty: true, // Đảm bảo tên không rỗng
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true, // Kiểm tra nếu là URL hợp lệ
      },
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1, // Đảm bảo order không nhỏ hơn 1
      },
    },

    levelRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0, // levelRequired không được nhỏ hơn 0
      },
    },

    type: {
      type: DataTypes.ENUM("main", "side", "event", "challenge"),
      defaultValue: "main",
      allowNull: false,
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
    indexes: [
      { fields: ["type"] },
      { fields: ["isActive"] },
      { fields: ["levelRequired"] },
    ],
  }
);

module.exports = Tower;

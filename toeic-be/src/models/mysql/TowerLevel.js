const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class TowerLevel extends Model {
  static associate(models) {
    this.belongsTo(models.Tower, {
      foreignKey: "towerId",
      as: "tower",
      onDelete: "CASCADE",
    });

    this.hasMany(models.UserTowerLevel, {
      foreignKey: "towerLevelId",
      as: "userProgress",
    });
  }
}

TowerLevel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    towerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "towers",
        key: "id",
      },
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    part: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 7,
      },
      comment: "Tương ứng với part TOEIC",
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    requiredExp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },

    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "True = khóa, cần hoàn thành tầng trước để mở",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // === Game Info ===
    gameType: {
      type: DataTypes.ENUM(
        "matching_picture",
        "maze_escape",
        "grammar_strike",
        "conversation_quest",
        "time_attack_talk",
        "missing_scrolls",
        "final_challenge"
      ),
      allowNull: false,
    },

    gameDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    gameIconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },

    // === Optional UI/UX Enhancements ===
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },

    backgroundMusic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },

    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Số giây giới hạn thời gian nếu có",
    },

    bonusExp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: "EXP thưởng nếu hoàn thành tầng này",
    },
  },
  {
    sequelize,
    modelName: "TowerLevel",
    tableName: "tower_levels",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = TowerLevel;

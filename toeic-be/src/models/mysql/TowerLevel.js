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
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

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
  },
  {
    sequelize,
    modelName: "TowerLevel",
    tableName: "tower_levels",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ fields: ["slug"] }],
  }
);

module.exports = TowerLevel;

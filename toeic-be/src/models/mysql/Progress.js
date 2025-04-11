const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Progress extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Lesson, {
      foreignKey: "lessonId",
      as: "lesson",
      onDelete: "CASCADE",
    });
  }
}

Progress.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "lessons", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("not_started", "in_progress", "completed"),
      defaultValue: "not_started",
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 990,
      },
    },
    accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    expGained: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Progress",
    tableName: "progresses",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["lessonId"] },
      { unique: true, fields: ["userId", "lessonId"] },
    ],
  }
);

module.exports = Progress;

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Progress extends Model {
  static init(sequelize) {
    super.init(
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
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        expGained: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "progresses",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    this.belongsTo(models.Lesson, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });
  }
}

module.exports = Progress;

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class MasteryRoad extends Model {
  static associate(models) {
    MasteryRoad.belongsTo(models.Course, { foreignKey: "courseId" });
    MasteryRoad.belongsTo(models.Tower, { foreignKey: "towerId" });
    MasteryRoad.belongsTo(models.Garden, { foreignKey: "gardenId" });
    MasteryRoad.belongsTo(models.Progress, { foreignKey: "progressId" });
  }
}

MasteryRoad.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "courses",
        key: "id",
      },
    },
    towerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "towers",
        key: "id",
      },
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "gardens",
        key: "id",
      },
    },
    difficultyLevel: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
      defaultValue: "beginner",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "MasteryRoad",
    tableName: "mastery_roads",
    timestamps: true,
  }
);

module.exports = MasteryRoad;

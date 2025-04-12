const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Lesson extends Model {
  static associate(models) {
    Lesson.belongsTo(models.Course, { foreignKey: "courseId" });
    Lesson.hasMany(models.Question, { foreignKey: "lessonId" });
  }
}

Lesson.init(
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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Lesson",
    tableName: "lessons",
    timestamps: true,
  }
);

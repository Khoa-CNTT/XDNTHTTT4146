const { DataTypes, Model } = require("sequelize");

class Lesson extends Model {
  static associate(models) {
    Lesson.belongsTo(models.Course, {
      foreignKey: "courseId",
      onDelete: "CASCADE",
    });

    Lesson.hasMany(models.Question, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });
  }
}

Lesson.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "lessons",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Lesson;

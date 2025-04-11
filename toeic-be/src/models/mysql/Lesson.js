const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Lesson extends Model {
  static associate(models) {
    this.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Question, {
      foreignKey: "lessonId",
      as: "questions",
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
      type: DataTypes.TEXT("long"),
      allowNull: false,
      comment: "Nội dung HTML hoặc markdown mô tả bài học",
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      comment: "Vị trí bài học trong khóa học",
    },
    type: {
      type: DataTypes.ENUM("reading", "listening", "video", "quiz", "grammar"),
      defaultValue: "reading",
      comment: "Phân loại bài học để tuỳ biến UI/UX hiển thị",
    },
    isPreviewable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "Cho phép người dùng học thử không cần đăng ký",
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
    modelName: "Lesson",
    tableName: "lessons",
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: ["courseId"] }, { fields: ["order"] }],
  }
);

module.exports = Lesson;

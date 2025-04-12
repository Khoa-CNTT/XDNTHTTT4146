const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Question extends Model {
  static associate(models) {
    this.belongsTo(models.MockTest, {
      foreignKey: "mock_test_id",
      as: "mockTest",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Tower, {
      foreignKey: "tower_id",
      as: "tower",
      onDelete: "SET NULL", // Giữ câu hỏi khi tầng bị xóa
    });
  }
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mock_test_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "mock_tests",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tower_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "towers", // Tên bảng Tower
        key: "id",
      },
      onDelete: "SET NULL",
    },
    part: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 7 },
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correct_answer: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isIn: [["A", "B", "C", "D"]],
      },
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "medium",
      allowNull: false,
    },
    audio_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
      { fields: ["mock_test_id"] },
      { fields: ["part"] },
      { fields: ["difficulty"] },
      { fields: ["tower_id"] },
    ],
  }
);

module.exports = Question;

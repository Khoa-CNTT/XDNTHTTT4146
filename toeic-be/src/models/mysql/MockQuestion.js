const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class MockQuestion extends Model {}

MockQuestion.init(
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
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    part: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MockQuestion",
    tableName: "mock_questions",
    timestamps: true,
  }
);

module.exports = MockQuestion;

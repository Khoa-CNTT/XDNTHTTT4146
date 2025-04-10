const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Question extends Model {
  static associate(models) {
    Question.belongsTo(models.MockTest, {
      foreignKey: "mock_test_id",
      onDelete: "CASCADE",
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
      validate: {
        isIn: [["A", "B", "C", "D"]],
      },
    },

    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    part: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 7,
      },
    },

    audio_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Question;

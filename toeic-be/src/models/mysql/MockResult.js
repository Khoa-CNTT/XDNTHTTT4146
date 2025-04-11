const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockResult extends Model {
  static associate(models) {
    this.belongsTo(models.MockTest, {
      foreignKey: "mock_test_id",
      as: "mockTest",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
  }

  // Gợi ý: thêm hàm tính accuracy nếu cần
  getAccuracy() {
    if (this.total_questions && this.correct_count >= 0) {
      return (
        Math.round((this.correct_count / this.total_questions) * 10000) / 100
      );
    }
    return null;
  }
}

MockResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    mock_test_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0, max: 990 },
    },

    correct_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },

    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },

    duration_taken: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    submitted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    section_scores: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 0, max: 100 },
    },

    status: {
      type: DataTypes.ENUM("completed", "in_progress", "expired"),
      allowNull: false,
      defaultValue: "completed",
    },
  },
  {
    sequelize,
    modelName: "MockResult",
    tableName: "mock_results",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ fields: ["user_id"] }, { fields: ["mock_test_id"] }],
  }
);

module.exports = MockResult;

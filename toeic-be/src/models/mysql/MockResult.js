const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockResult extends Model {
  static associate(models) {
    MockResult.belongsTo(models.MockTest, {
      foreignKey: "mock_test_id",
      as: "mockTest",
      onDelete: "CASCADE",
    });

    MockResult.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
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
      references: {
        model: "users",
        key: "id",
      },
    },

    mock_test_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "mock_tests",
        key: "id",
      },
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    correct_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    submitted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    duration_taken: {
      type: DataTypes.INTEGER, // tính bằng giây hoặc phút
      allowNull: true,
      comment: "Thời gian làm bài (giây hoặc phút)",
    },
  },
  {
    sequelize,
    modelName: "MockResult",
    tableName: "mock_results",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = MockResult;

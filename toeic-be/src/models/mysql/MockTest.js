const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockTest extends Model {
  static associate(models) {
    MockTest.hasMany(models.MockQuestion, {
      foreignKey: "mock_test_id",
      as: "questions",
      onDelete: "CASCADE",
    });

    MockTest.hasMany(models.MockResult, {
      foreignKey: "mock_test_id",
      as: "results",
      onDelete: "CASCADE",
    });

    MockTest.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  }
}

MockTest.init(
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

    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Đơn vị: phút",
    },

    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
      defaultValue: "medium",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "MockTest",
    tableName: "mock_tests",
    timestamps: true,
    paranoid: true, // Soft delete
  }
);

module.exports = MockTest;

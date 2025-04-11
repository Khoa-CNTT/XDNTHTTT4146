const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MockTest extends Model {
  static associate(models) {
    this.hasMany(models.MockQuestion, {
      foreignKey: "mock_test_id",
      as: "questions",
      onDelete: "CASCADE",
    });

    this.hasMany(models.MockResult, {
      foreignKey: "mock_test_id",
      as: "results",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
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

    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      comment: "Gắn nhãn như: [“toeic-listening”, “practice-part7”]",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "Nếu là false thì chỉ admin hoặc người tạo mới thấy",
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
    paranoid: true,
    indexes: [{ fields: ["created_by"] }, { fields: ["difficulty"] }],
  }
);

module.exports = MockTest;

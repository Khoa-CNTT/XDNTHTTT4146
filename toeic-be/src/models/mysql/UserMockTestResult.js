const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const User = require("./User");
const MockTest = require("./MockTest");

class UserMockTestResult extends Model {}

UserMockTestResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    mockTestId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "MockTests",
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserMockTestResult",
    tableName: "user_mock_test_results",
    timestamps: true,
  }
);

// Associations
UserMockTestResult.belongsTo(User, { foreignKey: "userId" });
UserMockTestResult.belongsTo(MockTest, { foreignKey: "mockTestId" });

module.exports = UserMockTestResult;

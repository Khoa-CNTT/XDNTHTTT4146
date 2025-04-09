const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const User = require("./User");
const Vocabulary = require("../../models/mysql/Vocabulary");
const ExpHistory = require("../../models/mysql/ExpHistory");

class VocabularyExpHistory extends Model {}

VocabularyExpHistory.init(
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
        model: User,
        key: "id",
      },
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Vocabulary,
        key: "id",
      },
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    sequelize,
    modelName: "VocabularyExpHistory",
    tableName: "vocabulary_exp_history",
    timestamps: true,
  }
);

module.exports = VocabularyExpHistory;

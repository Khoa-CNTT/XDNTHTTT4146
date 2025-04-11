const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class WordMeaning extends Model {
  static associate(models) {
    // Mỗi nghĩa thuộc về một từ vựng
    this.belongsTo(models.Vocabulary, {
      foreignKey: "vocabularyId",
      as: "vocabulary",
      onDelete: "CASCADE",
    });
  }
}

WordMeaning.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    partOfSpeech: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "WordMeaning",
    tableName: "word_meaning",
    timestamps: true,
    underscored: true,
  }
);

module.exports = WordMeaning;

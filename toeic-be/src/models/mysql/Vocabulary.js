const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Vocabulary extends Model {
  static associate(models) {
    Vocabulary.hasMany(models.VocabularyGarden, { foreignKey: "vocabularyId" });
  }
}

Vocabulary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pronunciation: {
      type: DataTypes.STRING,
    },
    example: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "vocabulary",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Vocabulary;

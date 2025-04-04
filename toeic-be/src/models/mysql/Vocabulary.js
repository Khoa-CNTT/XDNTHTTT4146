const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const VocabularyGarden = require("./VocabularyGarden");

class Vocabulary extends Model {}

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
    vocabularyGardenId: {
      type: DataTypes.UUID,
      references: {
        model: VocabularyGarden,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "vocabulary",
    timestamps: true,
    paranoid: true,
  }
);

VocabularyGarden.hasMany(Vocabulary, {
  foreignKey: "vocabularyGardenId",
});
Vocabulary.belongsTo(VocabularyGarden, {
  foreignKey: "vocabularyGardenId",
});

module.exports = Vocabulary;

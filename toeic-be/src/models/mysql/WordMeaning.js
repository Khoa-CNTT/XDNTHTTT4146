const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class WordMeaning extends Model {}

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
    },
    vocabularyId: {
      type: DataTypes.UUID,
      references: {
        model: Vocabulary,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "word_meaning",
    timestamps: true,
  }
);

Vocabulary.hasMany(WordMeaning, { foreignKey: "vocabularyId" });
WordMeaning.belongsTo(Vocabulary, { foreignKey: "vocabularyId" });

module.exports = WordMeaning;

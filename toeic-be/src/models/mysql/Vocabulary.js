const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Vocabulary extends Model {
  static associate(models) {
    this.hasMany(models.VocabularyGarden, {
      foreignKey: "vocabularyId",
      as: "vocabularyGardens",
    });
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
      allowNull: true,
    },

    ipa: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    audioUrl: {
      type: DataTypes.STRING,
      validate: { isUrl: true },
      allowNull: true,
    },

    partOfSpeech: {
      type: DataTypes.ENUM(
        "noun",
        "verb",
        "adj",
        "adv",
        "prep",
        "conj",
        "other"
      ),
      allowNull: true,
    },

    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "easy",
    },

    example: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    synonyms: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    antonyms: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },

    category: {
      type: DataTypes.ENUM(
        "business",
        "travel",
        "technology",
        "education",
        "health",
        "daily",
        "other"
      ),
      defaultValue: "other",
    },

    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    level: {
      type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
      allowNull: true,
    },

    is_common: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    reviewedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lastReviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Vocabulary",
    tableName: "vocabulary",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["word"], unique: true },
      { fields: ["category"] },
      { fields: ["difficulty"] },
      { fields: ["partOfSpeech"] },
    ],
  }
);

module.exports = Vocabulary;

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class VocabularyGarden extends Model {
  static associate(models) {
    VocabularyGarden.belongsTo(models.User, { foreignKey: "userId" });
    VocabularyGarden.belongsTo(models.Seed, { foreignKey: "seedId" });
    VocabularyGarden.belongsTo(models.Vocabulary, {
      foreignKey: "vocabularyId",
    });
  }
}

VocabularyGarden.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seedId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("planted", "growing", "harvested"),
      defaultValue: "planted",
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    plantedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    harvestedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    wateringCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastInteractedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "vocabulary_garden",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = VocabularyGarden;

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class VocabularyGarden extends Model {
  static associate(models) {
    VocabularyGarden.belongsTo(models.User, { foreignKey: "userId" });
    VocabularyGarden.belongsTo(models.Item, { foreignKey: "itemId" });
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

    itemId: {
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
      validate: {
        min: 0,
      },
    },

    plantedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    harvestedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isHarvestedDateValid() {
          if (this.status === "harvested" && !this.harvestedAt) {
            throw new Error(
              "harvestedAt must be set when status is 'harvested'"
            );
          }
        },
      },
    },

    wateringCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
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
    indexes: [
      { fields: ["userId"] },
      { fields: ["itemId"] }, // Chỉnh sửa chỉ mục cho itemId thay vì seedId
      { fields: ["vocabularyId"] },
    ],
  }
);

module.exports = VocabularyGarden;

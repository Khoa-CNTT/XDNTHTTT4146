const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Seed extends Model {
  static associate(models) {
    this.hasMany(models.Vocabulary, {
      foreignKey: "seedId",
      as: "words",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "creator",
    });

    this.belongsToMany(models.User, {
      through: models.UserSeed,
      foreignKey: "seedId",
      as: "users",
    });

    this.belongsTo(models.Reward, {
      foreignKey: "rewardId",
      as: "reward",
    });
  }
}

Seed.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Tên gói từ vựng – VD: Chủ đề Travel, Work, School...",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    total_words: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { min: 1 },
      comment: "Tổng số từ trong seed – để tính % hoàn thành",
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "URL ảnh đại diện của seed (giao diện Garden)",
    },

    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
      defaultValue: "medium",
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Người tạo seed (admin hoặc user tạo custom)",
    },

    rewardId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Seed có công khai không?",
    },

    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'VD: ["toeic-part5", "business", "travel"]',
    },
  },
  {
    sequelize,
    modelName: "Seed",
    tableName: "seeds",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["difficulty"] },
      { fields: ["createdBy"] },
      { fields: ["rewardId"] },
      { fields: ["isPublic"] },
    ],
  }
);

module.exports = Seed;

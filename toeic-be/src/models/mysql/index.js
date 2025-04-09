const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Import các mô hình
const User = require("./User");
const Item = require("./Item");
const Course = require("./Course");
const Lesson = require("./Lesson");
const Progress = require("./Progress");
const Badge = require("./Badge");
const Role = require("./Role");
const Enrollment = require("./Enrollment");
const Payment = require("./Payment");
const Seed = require("./Seed");
const Shop = require("./Shop");
const Game = require("./Game");
const Level = require("./Level");
const Mission = require("./Mission");
const Vocabulary = require("./Vocabulary");
const Reward = require("./Reward");
const VocabularyGarden = require("./VocabularyGarden");
const MockQuestion = require("./MockQuestion");
const MockTest = require("./MockTest");
const CoinTransaction = require("./CoinTransaction");
const MockResult = require("./MockResult");
const VocabularyExpHistory = require("./VocabularyExpHistory");
const WordMeaning = require("./WordMeaning");
const SystemNotification = require("./SystemNotification");

const models = {
  User,
  Item,
  Course,
  Lesson,
  Progress,
  Badge,
  Role,
  Enrollment,
  Payment,
  Seed,
  Shop,
  Game,
  Level,
  Vocabulary,
  Mission,
  MockQuestion,
  MockTest,
  MockResult,
  Reward,
  VocabularyGarden,
  SystemNotification,
  CoinTransaction,
};

Object.values(models).forEach((model) => {
  if (typeof model.init === "function") {
    model.init(sequelize);
  }
});

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(Enrollment, { foreignKey: "userId" });
Enrollment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(Progress, { foreignKey: "userId" });
Progress.belongsTo(User, { foreignKey: "userId" });

Progress.belongsTo(Course, { foreignKey: "courseId" });

User.hasMany(Badge, { foreignKey: "userId" });
Badge.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Seed.hasMany(Item, { foreignKey: "seedId" });
Item.belongsTo(Seed, { foreignKey: "seedId" });

Game.hasMany(Level, { foreignKey: "gameId" });
Level.belongsTo(Game, { foreignKey: "gameId" });

SystemNotification.belongsTo(User, { foreignKey: "userId" });
User.hasMany(SystemNotification, { foreignKey: "userId" });

Shop.hasMany(Item, { foreignKey: "shopId" });
Item.belongsTo(Shop, { foreignKey: "shopId" });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = {
  ...models,
  sequelize,
  syncDatabase,
};

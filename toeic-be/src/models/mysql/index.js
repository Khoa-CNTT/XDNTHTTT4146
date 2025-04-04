const { Sequelize } = require("sequelize");
const { sequelize } = require("../../config/mysql");

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

const User = require("./User");
const Item = require("./Item");
const Course = require("./Course");
const Lesson = require("./Lesson");
const Progress = require("./Progress");
const Badge = require("./Badge");
const Role = require("./Role");
const Enrollment = require("./Enrollment");
const Payment = require("./Payment");

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

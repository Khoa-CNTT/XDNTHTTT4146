const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { sequelize } = require("../config/mysql");
require("../config/mongo");

const mysqlModels = {};
const mongodbModels = {};

const mysqlPath = path.join(__dirname, "mysql");
fs.readdirSync(mysqlPath).forEach((file) => {
  if (!file.endsWith(".js") || file === "index.js") return;

  const fullPath = path.join(mysqlPath, file);
  try {
    const model = require(fullPath);
    mysqlModels[model.name] = model;
    console.log(chalk.green(`✅ MySQL model loaded: ${model.name}`));
  } catch (err) {
    console.error(chalk.red(`❌ Failed to load MySQL model: ${file}\n${err}`));
  }
});

Object.values(mysqlModels).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(mysqlModels);
  }
});

const mongodbPath = path.join(__dirname, "mongo");
fs.readdirSync(mongodbPath).forEach((file) => {
  if (!file.endsWith(".js") || file === "index.js") return;

  const fullPath = path.join(mongodbPath, file);
  try {
    const model = require(fullPath);
    mongodbModels[model.modelName] = model;
    console.log(chalk.cyan(`✅ MongoDB model loaded: ${model.modelName}`));
  } catch (err) {
    console.error(
      chalk.red(`❌ Failed to load MongoDB model: ${file}\n${err}`)
    );
  }
});

module.exports = {
  ...mysqlModels,
  ...mongodbModels,
  mysqlModels,
  mongodbModels,
  sequelize,
};

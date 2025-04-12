const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { sequelize } = require("../config/mysql");
require("../config/mongo"); // Kết nối MongoDB trước

const mysqlModels = {};
const mongodbModels = {};

const mysqlPath = path.join(__dirname, "mysql");
const mongodbPath = path.join(__dirname, "mongo");

// ====== Load MySQL models ======
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

// ====== Associate MySQL models sau khi load hết ======
Object.values(mysqlModels).forEach((model) => {
  if (model && typeof model.associate === "function") {
    try {
      model.associate(mysqlModels);
      console.log(chalk.gray(`🔗 Associated MySQL model: ${model.name}`));
    } catch (err) {
      console.error(
        chalk.red(`❌ Failed to associate MySQL model: ${model.name}\n${err}`)
      );
    }
  } else {
    console.log(
      chalk.yellow(`⚠️ No associate function for model: ${model.name}`)
    );
  }
});

// ====== Load MongoDB models ======
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

// ====== Export tổng ======
module.exports = {
  ...mysqlModels,
  ...mongodbModels,
  mysqlModels,
  mongodbModels,
  sequelize,
};

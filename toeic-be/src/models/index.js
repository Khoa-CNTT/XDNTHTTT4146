const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/mysql");

const mysqlModels = {};
const mongodbModels = {};

// Load MySQL models
const mysqlPath = path.join(__dirname, "mysql");
fs.readdirSync(mysqlPath).forEach((file) => {
  if (file.endsWith(".js") && file !== "index.js") {
    const model = require(path.join(mysqlPath, file));
    mysqlModels[model.name] = model;
    console.log(`✅ MySQL model loaded: ${model.name}`);
  }
});

// Initialize & associate MySQL models
Object.values(mysqlModels).forEach((model) => {
  if (typeof model.init === "function") model.init(sequelize);
});
Object.values(mysqlModels).forEach((model) => {
  if (typeof model.associate === "function") model.associate(mysqlModels);
});

// Load MongoDB models
const mongodbPath = path.join(__dirname, "mongo");
fs.readdirSync(mongodbPath).forEach((file) => {
  if (file.endsWith(".js") && file !== "index.js") {
    const model = require(path.join(mongodbPath, file));
    mongodbModels[model.modelName] = model;
    console.log(`✅ MongoDB model loaded: ${model.modelName}`);
  }
});

module.exports = {
  mysqlModels,
  mongodbModels,
  sequelize,
};

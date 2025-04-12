const fs = require("fs");
const path = require("path");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const schemas = [];

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || !file.endsWith("Schema.js")) return;

  const schemaModule = require(path.join(__dirname, file));
  if (schemaModule.typeDefs) {
    schemas.push(schemaModule.typeDefs);
  } else if (schemaModule.imageSchema || schemaModule.itemSchema) {
    // Cho những schema không đặt tên là typeDefs
    if (schemaModule.imageSchema) schemas.push(schemaModule.imageSchema);
    if (schemaModule.itemSchema) schemas.push(schemaModule.itemSchema);
  }
});

const typeDefs = mergeTypeDefs(schemas);

module.exports = { typeDefs };

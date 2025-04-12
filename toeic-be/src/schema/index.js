const fs = require("fs");
const path = require("path");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const schemas = [];

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || !file.endsWith("Schema.js")) return;

  const schemaModule = require(path.join(__dirname, file));

  Object.values(schemaModule).forEach((schema) => {
    schemas.push(schema);
  });
});

const typeDefs = mergeTypeDefs(schemas);

module.exports = { typeDefs };

const fs = require("fs");
const path = require("path");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const schemas = [];

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || !file.endsWith("Schema.js")) return;

  const schema = require(path.join(__dirname, file));

  if (schema?.kind === "Document") {
    schemas.push(schema);
  }
});

const typeDefs = mergeTypeDefs(schemas);

module.exports = { typeDefs };

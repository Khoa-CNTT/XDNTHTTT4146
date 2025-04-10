const { connectMySQL } = require("./mysql");
const connectMongoDB = require("./mongo");

async function initDatabase() {
  await connectMySQL();
  await connectMongoDB();
}

module.exports = initDatabase;

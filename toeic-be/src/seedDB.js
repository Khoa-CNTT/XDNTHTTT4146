const { sequelize } = require("./config/mysql");
const { mongo } = require("./config/mongo");
const mongoose = require("mongoose");

// Import các seeders cho MySQL và MongoDB
const seedersMySQL = [
  "roles",
  "users",
  "courses",
  "lessons",
  "questions",
  "answers",
  "enrollments",
  "payments",
  "expHistory",
  "coinTransactions",
  "games",
  "leaderboard",
  "badges",
];

const seedersMongo = [
  "roles",
  "users",
  "vocabularies",
  "courses",
  "lessons",
  "questions",
  "answers",
  "enrollments",
  "payments",
  "progresses",
  "badges",
  "items",
  "shops",
];

// Hàm seed cho MySQL
const seedMySQL = async () => {
  for (const seeder of seedersMySQL) {
    const seedFunction = require(`./seeders/${seeder}`);
    await seedFunction();
    console.log(`${seeder} seeding completed!`);
  }
};

// Hàm seed cho MongoDB
const seedMongo = async () => {
  for (const seeder of seedersMongo) {
    const seedFunction = require(`./seeders/${seeder}`);
    await seedFunction();
    console.log(`${seeder} seeding completed!`);
  }
};

// Hàm chính thực hiện seeding
const seedAllDatabases = async () => {
  try {
    console.log("Starting seeding process...");

    // ---------------------------------------------
    // Seeding MySQL
    console.log("Seeding MySQL...");
    await sequelize.sync({ force: true });
    console.log("MySQL database schema recreated!");

    await seedMySQL();
    console.log("MySQL seeding completed!");

    // ---------------------------------------------
    // Seeding MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    if (collections.length === 0) {
      console.log("MongoDB is empty, seeding initial data...");
      await seedMongo();
      console.log("MongoDB seeding completed!");
    } else {
      console.log("MongoDB already has data, skipping seeding.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding process failed:", error);
    process.exit(1);
  }
};

seedAllDatabases();

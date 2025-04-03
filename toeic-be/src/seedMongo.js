const mongoose = require("mongoose");
const { mongo } = require("./config/mongodb");

const seedRoles = require("./seeders/roles");
const seedUsers = require("./seeders/users");
const seedVocabularies = require("./seeders/vocabularies");
const seedCourses = require("./seeders/courses");
const seedLessons = require("./seeders/lessons");
const seedQuestions = require("./seeders/questions");
const seedAnswers = require("./seeders/answers");
const seedEnrollments = require("./seeders/enrollments");
const seedPayments = require("./seeders/payments");
const seedProgresses = require("./seeders/progresses");
const seedBadges = require("./seeders/badges");
const seedItems = require("./seeders/items");
const seedShops = require("./seeders/shops");

const seedDatabase = async () => {
  try {
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
      console.log("🛠 Database is empty, seeding initial data...");

      await seedRoles();
      await seedUsers();
      await seedVocabularies();
      await seedCourses();
      await seedLessons();
      await seedQuestions();
      await seedAnswers();
      await seedEnrollments();
      await seedPayments();
      await seedProgresses();
      await seedBadges();
      await seedItems();
      await seedShops();

      console.log("MongoDB Seeding completed!");
    } else {
      console.log("MongoDB already has data, skipping seeding.");
    }

    process.exit(0);
  } catch (error) {
    console.error("MongoDB Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();

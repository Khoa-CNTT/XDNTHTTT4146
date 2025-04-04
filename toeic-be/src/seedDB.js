const { sequelize } = require("./config/mysql");
const mongoose = require("mongoose");
const { mongo } = require("./config/mongodb");

// Import các seeders cho MySQL
const seedRolesMySQL = require("./seeders/roles");
const seedUsersMySQL = require("./seeders/users");
const seedCoursesMySQL = require("./seeders/courses");
const seedLessonsMySQL = require("./seeders/lessons");
const seedQuestionsMySQL = require("./seeders/questions");
const seedAnswersMySQL = require("./seeders/answers");
const seedEnrollmentsMySQL = require("./seeders/enrollments");
const seedPaymentsMySQL = require("./seeders/payments");
const seedExpHistoryMySQL = require("./seeders/expHistory");
const seedCoinTransactionsMySQL = require("./seeders/coinTransactions");
const seedGamesMySQL = require("./seeders/games");
const seedLeaderboardMySQL = require("./seeders/leaderboard");
const seedBadgesMySQL = require("./seeders/badges");

// Import các seeders cho MongoDB
const seedRolesMongo = require("./seeders/roles");
const seedUsersMongo = require("./seeders/users");
const seedVocabulariesMongo = require("./seeders/vocabularies");
const seedCoursesMongo = require("./seeders/courses");
const seedLessonsMongo = require("./seeders/lessons");
const seedQuestionsMongo = require("./seeders/questions");
const seedAnswersMongo = require("./seeders/answers");
const seedEnrollmentsMongo = require("./seeders/enrollments");
const seedPaymentsMongo = require("./seeders/payments");
const seedProgressesMongo = require("./seeders/progresses");
const seedBadgesMongo = require("./seeders/badges");
const seedItemsMongo = require("./seeders/items");
const seedShopsMongo = require("./seeders/shops");

const seedAllDatabases = async () => {
  try {
    console.log("Starting seeding process...");

    // ---------------------------------------------
    // Seeding MySQL
    console.log("Seeding MySQL...");
    await sequelize.sync({ force: true });
    console.log("MySQL database schema recreated!");

    await seedRolesMySQL();
    await seedUsersMySQL();
    await seedCoursesMySQL();
    await seedLessonsMySQL();
    await seedQuestionsMySQL();
    await seedAnswersMySQL();
    await seedEnrollmentsMySQL();
    await seedPaymentsMySQL();
    await seedExpHistoryMySQL();
    await seedCoinTransactionsMySQL();
    await seedGamesMySQL();
    await seedLeaderboardMySQL();
    await seedBadgesMySQL();
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

      await seedRolesMongo();
      await seedUsersMongo();
      await seedVocabulariesMongo();
      await seedCoursesMongo();
      await seedLessonsMongo();
      await seedQuestionsMongo();
      await seedAnswersMongo();
      await seedEnrollmentsMongo();
      await seedPaymentsMongo();
      await seedProgressesMongo();
      await seedBadgesMongo();
      await seedItemsMongo();
      await seedShopsMongo();

      console.log("MongoDB seeding completed!");
    } else {
      console.log("MongoDB already has data, skipping seeding.");
    }

    // End seeding process
    process.exit(0);
  } catch (error) {
    console.error("Seeding process failed:", error);
    process.exit(1);
  }
};

seedAllDatabases();

const { sequelize } = require("./config/mysql");

const seedRoles = require("./seeders/roles");
const seedUsers = require("./seeders/users");
const seedCourses = require("./seeders/courses");
const seedLessons = require("./seeders/lessons");
const seedQuestions = require("./seeders/questions");
const seedAnswers = require("./seeders/answers");
const seedEnrollments = require("./seeders/enrollments");
const seedPayments = require("./seeders/payments");
const seedExpHistory = require("./seeders/expHistory");
const seedCoinTransactions = require("./seeders/coinTransactions");
const seedGames = require("./seeders/games");
const seedLeaderboard = require("./seeders/leaderboard");
const seedBadges = require("./seeders/badges");

const seedDatabase = async () => {
  try {
    console.log("Starting MySQL Seeding...");
    await sequelize.sync({ force: true });
    console.log("Database schema recreated!");

    await seedRoles();
    await seedUsers();
    await seedCourses();
    await seedLessons();
    await seedQuestions();
    await seedAnswers();
    await seedEnrollments();
    await seedPayments();
    await seedExpHistory();
    await seedCoinTransactions();
    await seedGames();
    await seedLeaderboard();
    await seedBadges();

    console.log("MySQL Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();

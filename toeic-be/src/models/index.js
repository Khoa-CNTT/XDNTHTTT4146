require("dotenv").config();
const path = require("path");
const { sequelize } = require("../config/mysql");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
require("../config/passport-config");

const db = {
  mysql: {},
  mongo: {},
};

const mysqlModelsOrder = [
  // Các bảng cha/phụ thuộc sớm
  "Role.js",
  "Badge.js",
  "ItemType.js",

  // Entity core
  "User.js",
  "UserBadge.js",
  "UserItem.js",
  "UserReward.js",

  // Học tập
  "Course.js",
  "CourseUser.js",
  "Lesson.js",
  "Vocabulary.js",
  "WordMeaning.js",
  "Question.js",
  "Answer.js",
  "MiniTest.js",
  "TestResult.js",
  "MockTest.js",
  "MockResult.js",
  "MiniGame.js",
  "MiniGameCourse.js",

  // Hành trình
  "MasteryRoad.js",
  "Progress.js",

  // Nông trại
  "Garden.js",
  "Land.js",
  "LandItem.js",
  "GardenItem.js",
  "Floor.js",

  // Tower
  "Tower.js",

  // Tài nguyên
  "Item.js",
  "Image.js",
  "Audio.js",
  "Reward.js",

  // Giao dịch
  "Payment.js",
  "Transaction.js",
  "Invoice.js",

  "Notification.js",
];

mysqlModelsOrder.forEach((file) => {
  const model = require(path.join(__dirname, "mysql", file));
  const modelName = model?.name || file.replace(".js", "");
  db.mysql[modelName] = model;
});

// Gọi associate sau khi đã load xong toàn bộ models
Object.values(db.mysql).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db.mysql);
  }
});

// Đồng bộ Sequelize
(async () => {
  try {
    await sequelize.sync({ alter: true }); // hoặc force: true để reset
    console.log("✅ All MySQL tables synced successfully!");
  } catch (err) {
    console.error("❌ Sync error:", err.message);
  }
})();

// Load MongoDB models (cứ giữ nguyên)
const fs = require("fs");
const mongoPath = path.join(__dirname, "mongo");
try {
  fs.readdirSync(mongoPath)
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const model = require(path.join(mongoPath, file));
      const modelName = model?.modelName || file.replace(".js", "");
      db.mongo[modelName] = model;
    });
} catch (error) {
  console.error("❌ Error loading MongoDB models:", error);
}

// Export everything
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mongoose = mongoose;

module.exports = db;

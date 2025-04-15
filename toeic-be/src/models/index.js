require("dotenv").config();
const path = require("path");
const fs = require("fs");
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

// 1. Load Sequelize models theo thứ tự
mysqlModelsOrder.forEach((file) => {
  const model = require(path.join(__dirname, "mysql", file));
  const modelName = model?.name || file.replace(".js", "");
  db.mysql[modelName] = model;
});

// 2. Gọi associate() sau khi toàn bộ models đã được load
Object.values(db.mysql).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db.mysql);
  }
});

// 3. Sync từng bảng nếu chưa tồn tại
const queryInterface = sequelize.getQueryInterface();

(async () => {
  try {
    for (const modelName of Object.keys(db.mysql)) {
      const model = db.mysql[modelName];
      const tableName = model.getTableName();

      const exists = await queryInterface
        .describeTable(tableName)
        .then(() => true)
        .catch(() => false);

      if (!exists) {
        await model.sync();
        console.log(`✅ Created table: ${tableName}`);
      } else {
        console.log(`ℹ️ Skipped existing table: ${tableName}`);
      }
    }

    console.log("🎉 All MySQL models checked and synced (if needed).");
  } catch (err) {
    console.error("❌ Table sync error:", err.message);
  }
})();

// 4. Load MongoDB models
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

// 5. Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mongoose = mongoose;

module.exports = db;

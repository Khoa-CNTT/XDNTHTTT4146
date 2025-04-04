require("dotenv").config();
const { Sequelize } = require("sequelize");
const { createConnection } = require("mysql2/promise");

// Lấy thông tin cấu hình từ các biến môi trường
const mysqlConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "",
  database: process.env.MYSQL_DB || "toeic_gamification",
  dialect: process.env.MYSQL_DIALECT || "mysql",
  logging: process.env.NODE_ENV === "development",
};

// Hàm tạo database nếu chưa tồn tại
const createDatabaseIfNotExists = async () => {
  let connection;
  try {
    connection = await createConnection({
      host: mysqlConfig.host,
      user: mysqlConfig.username,
      password: mysqlConfig.password,
    });

    // Kiểm tra và tạo database nếu chưa tồn tại
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.database}\`;`
    );
    console.log(`Database '${mysqlConfig.database}' is ready!`);
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
};

// Khởi tạo Sequelize với các thông tin cấu hình từ biến môi trường
const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.username,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    logging: mysqlConfig.logging,
  }
);

// Hàm kết nối MySQL và đồng bộ hóa các mô hình
const connectMySQL = async () => {
  try {
    await createDatabaseIfNotExists();

    await sequelize.authenticate();
    console.log("MySQL connected successfully!");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("All models synchronized successfully!");
    }
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectMySQL };

const { Sequelize } = require("sequelize");
const { createConnection } = require("mysql2/promise");
const { mysql } = require("./config");

const createDatabaseIfNotExists = async () => {
  try {
    const connection = await createConnection({
      host: mysql.host,
      user: mysql.username,
      password: mysql.password,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${mysql.database}\`;`
    );
    console.log(`✅ Database '${mysql.database}' sẵn sàng!`);
    await connection.end();
  } catch (error) {
    console.error("❌ Lỗi khi tạo database:", error.message);
    process.exit(1);
  }
};

const sequelize = new Sequelize(
  mysql.database,
  mysql.username,
  mysql.password,
  {
    host: mysql.host,
    dialect: mysql.dialect,
    logging: mysql.logging,
    define: {
      underscored: true,
    },
  }
);

const connectMySQL = async () => {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log("✅ Kết nối MySQL thành công!");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("✅ Đồng bộ models thành công!");
    }
  } catch (error) {
    console.error("❌ Lỗi kết nối MySQL:", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectMySQL,
};

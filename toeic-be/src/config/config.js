require("dotenv").config();

module.exports = {
  mysql: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS || "",
    dialect: process.env.MYSQL_DIALECT || "mysql",
    logging: false,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL,
  },
  frontendUrl: process.env.FRONTEND_URL,
};

const mongoose = require("mongoose");
const { mongo } = require("./config");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Kiểm tra nếu DB trống thì có thể seed dữ liệu mẫu
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    if (collections.length === 0) {
      console.log("Database is empty, consider seeding initial data.");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;

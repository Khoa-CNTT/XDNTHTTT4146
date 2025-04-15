const mongoose = require("mongoose");
const { mongo } = require("./config");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongo.uri);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    if (collections.length === 0) {
      console.log(
        "MongoDB connected. Database is empty, you may want to seed initial data."
      );
    } else {
      console.log("MongoDB connected successfully!");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;

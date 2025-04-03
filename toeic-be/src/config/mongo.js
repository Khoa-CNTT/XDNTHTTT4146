const mongoose = require("mongoose");
const { mongo } = require("./config");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;

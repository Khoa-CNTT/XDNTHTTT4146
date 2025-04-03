const mongoose = require("mongoose");

const userLevelSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    levelId: { type: mongoose.Schema.Types.ObjectId, ref: "Level" },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

class UserLevelClass {
  static async findByUser(userId) {
    return this.find({ userId }).populate("levelId");
  }

  async completeLevel() {
    this.completed = true;
    this.progress = 100;
    return this.save();
  }
}

userLevelSchema.loadClass(UserLevelClass);

const UserLevel = mongoose.model("UserLevel", userLevelSchema);
module.exports = UserLevel;

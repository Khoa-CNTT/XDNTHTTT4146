const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    score: { type: Number, required: true },
    completedAt: { type: Date },
    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED", "NOT_STARTED"],
      default: "IN_PROGRESS",
    },
  },
  { timestamps: true }
);

const LessonProgress = mongoose.model("LessonProgress", lessonProgressSchema);

module.exports = LessonProgress;

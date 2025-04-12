const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    progress: { type: Number, default: 0.0 }, // Tỷ lệ hoàn thành
    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED", "NOT_STARTED"],
      default: "IN_PROGRESS",
    },
  },
  { timestamps: true }
);

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

module.exports = CourseProgress;

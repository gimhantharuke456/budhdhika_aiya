const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  enrollmentKey: { type: String, unique: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  credits: Number,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

const mongoose = require("mongoose");

const TeacherRequestSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  content: { type: String, required: true },
  type: { type: String, default: "teacher" },
  status: {
    type: String,
    enum: ["pending", "reviewed", "resolved"],
    default: "pending",
  },
  dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeacherRequest", TeacherRequestSchema);

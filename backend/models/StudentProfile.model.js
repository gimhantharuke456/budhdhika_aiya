const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  image: String,
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);
module.exports = StudentProfile;

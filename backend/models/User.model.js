const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "admin",
      "student",
      "student_manager",
      "module_manager",
      "teacher",
      "cash_flow_staff",
      "non_academic_staff",
      "class_schedule_manager",
      "maintenance_manager",
      "canteen_manager",
    ],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

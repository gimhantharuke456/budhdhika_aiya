const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  subjects: [{ type: String }],
  profileDetails: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("Teacher", TeacherSchema);

const mongoose = require("mongoose");

const hallRequestSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfStudents: {
    type: Number,
    required: true,
  },
  timeAndDate: {
    type: Date,
    required: true,
  },
  hallNumber: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const HallRequest = mongoose.model("HallRequest", hallRequestSchema);

module.exports = HallRequest;

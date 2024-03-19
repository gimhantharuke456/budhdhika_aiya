const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  leaveDate: {
    type: Date,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

module.exports = LeaveRequest;

const LeaveRequest = require("../models/Leaverequest.model");

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get leave requests by createdBy
exports.getLeaveRequestsByCreatedBy = async (req, res) => {
  const { createdBy } = req.params;
  try {
    const leaveRequests = await LeaveRequest.find({ createdBy });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a leave request
exports.createLeaveRequest = async (req, res) => {
  const { createdBy, reason, leaveDate } = req.body;
  try {
    const newLeaveRequest = new LeaveRequest({ createdBy, reason, leaveDate });
    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a leave request
exports.updateLeaveRequest = async (req, res) => {
  const { id } = req.params;
  const { reason, leaveDate, approved } = req.body;
  try {
    const leaveRequest = await LeaveRequest.findById(id);
    if (!leaveRequest)
      return res.status(404).json({ message: "Leave request not found" });
    leaveRequest.reason = reason;
    leaveRequest.leaveDate = leaveDate;
    leaveRequest.approved = approved;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a leave request
exports.deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await LeaveRequest.findByIdAndDelete(id);

    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

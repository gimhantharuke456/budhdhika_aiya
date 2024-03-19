const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaverequest.controller");

// Get all leave requests
router.get("/", leaveController.getAllLeaveRequests);

// Get leave requests by createdBy
router.get(
  "/createdBy/:createdBy",
  leaveController.getLeaveRequestsByCreatedBy
);

// Create a leave request
router.post("/", leaveController.createLeaveRequest);

// Update a leave request
router.put("/:id", leaveController.updateLeaveRequest);

// Delete a leave request
router.delete("/:id", leaveController.deleteLeaveRequest);

module.exports = router;

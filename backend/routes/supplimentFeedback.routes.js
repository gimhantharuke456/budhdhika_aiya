const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/supplimentfeedback.controller");

// Get all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// Get feedbacks by suppliment
router.get(
  "/suppliment/:supplimentId",
  feedbackController.getFeedbacksBySuppliment
);

// Add new feedback
router.post("/", feedbackController.addFeedback);

// Update feedback
router.put("/:id", feedbackController.updateFeedback);

// Delete feedback
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;

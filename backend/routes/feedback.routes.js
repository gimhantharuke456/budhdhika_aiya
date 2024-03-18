const express = require("express");
const {
  createFeedback,
  getFeedbacksForCourse,
  updateFeedback,
  deleteFeedback,
  getFeedbacks,
} = require("../controllers/feedback.controller");

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedbacks);
router.get("/course/:courseId", getFeedbacksForCourse);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;

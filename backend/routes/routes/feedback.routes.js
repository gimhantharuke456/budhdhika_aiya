const express = require("express");
const router = express.Router();
const feedbackController = require("../../controllers/feedbck.controller");

router.post("/teacher-feedbacks", feedbackController.createFeedback);
router.get("/teacher-feedbacks", feedbackController.getAllFeedbacks);
router.get("/teacher-feedbacks/:id", feedbackController.getFeedbackById);
router.put("/teacher-feedbacks/:id", feedbackController.updateFeedback);
router.delete("/teacher-feedbacks/:id", feedbackController.deleteFeedback);

module.exports = router;

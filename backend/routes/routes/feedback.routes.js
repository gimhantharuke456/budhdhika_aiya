const express = require("express");
const router = express.Router();
const feedbackController = require("../../controllers/feedbck.controller");

router.post("/feedbacks", feedbackController.createFeedback);
router.get("/feedbacks", feedbackController.getAllFeedbacks);
router.get("/feedbacks/:id", feedbackController.getFeedbackById);
router.put("/feedbacks/:id", feedbackController.updateFeedback);
router.delete("/feedbacks/:id", feedbackController.deleteFeedback);

module.exports = router;

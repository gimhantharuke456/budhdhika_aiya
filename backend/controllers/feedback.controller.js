const Feedback = require("../models/Feedback.model");

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating feedback", error: error.message });
  }
};

// Get all feedbacks for a course
exports.getFeedbacksForCourse = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ course: req.params.courseId })
      .populate("createdBy", "name")
      .populate("course", "name");
    res.json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
};
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("createdBy", "name")
      .populate("course", "name");
    res.json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFeedback);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating feedback", error: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting feedback", error: error.message });
  }
};

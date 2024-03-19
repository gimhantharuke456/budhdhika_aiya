const Feedback = require("../models/foorFeedback.model");

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get feedbacks by suppliment
exports.getFeedbacksBySuppliment = async (req, res) => {
  const { supplimentId } = req.params;
  try {
    const feedbacks = await Feedback.find({ suppliment: supplimentId })
      .populate("suppliment")
      .populate("createdBy");
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks by suppliment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add new feedback
exports.addFeedback = async (req, res) => {
  const { suppliment, rating, comment, createdBy } = req.body;
  try {
    const feedback = new Feedback({ suppliment, rating, comment, createdBy });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

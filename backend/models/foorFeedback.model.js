const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    suppliment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suppliment",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("FoodFeedback", feedbackSchema);

module.exports = Feedback;

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    payAmount: {
      type: Number,
      required: true,
    },
    reason: String,
    payedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

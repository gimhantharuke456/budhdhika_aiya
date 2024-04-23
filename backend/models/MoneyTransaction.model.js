const mongoose = require("mongoose");

// Define schema for money transactions
const moneyTransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["donation", "petty_cash"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    givenBy: {
      type: String, // Assuming givenBy is the email of the donor or cashier
      required: true,
    },
    description: {
      type: String,
      default: null, // Assuming description is optional, set default to null
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const MoneyTransaction = mongoose.model(
  "MoneyTransaction",
  moneyTransactionSchema
);

module.exports = MoneyTransaction;

const mongoose = require("mongoose");

const supplementSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityAvailability: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Supplement = mongoose.model("Supplement", supplementSchema);

module.exports = Supplement;

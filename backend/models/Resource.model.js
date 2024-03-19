const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;

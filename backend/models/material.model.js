const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    require: true,
    default: "teacher",
    type: String,
  },
  documentUrl: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Material", MaterialSchema);

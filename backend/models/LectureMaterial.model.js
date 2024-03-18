const mongoose = require("mongoose");

const lectureMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LectureMaterial = mongoose.model(
  "LectureMaterial",
  lectureMaterialSchema
);

module.exports = LectureMaterial;

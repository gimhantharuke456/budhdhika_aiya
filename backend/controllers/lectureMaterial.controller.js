const LectureMaterial = require("../models/LectureMaterial.model");

// Create a new lecture material
exports.createLectureMaterial = async (req, res) => {
  try {
    const lectureMaterial = new LectureMaterial({
      ...req.body,
      // Assuming file upload is handled separately and URL is sent in the request
    });
    await lectureMaterial.save();
    res.status(201).json(lectureMaterial);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error creating lecture material",
        error: error.message,
      });
  }
};

// Get all lecture materials
exports.getAllLectureMaterials = async (req, res) => {
  try {
    const lectureMaterials = await LectureMaterial.find().populate("course");
    res.json(lectureMaterials);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching lecture materials",
        error: error.message,
      });
  }
};

// Get a single lecture material by ID
exports.getLectureMaterialById = async (req, res) => {
  try {
    const lectureMaterial = await LectureMaterial.findById(
      req.params.id
    ).populate("course");
    if (!lectureMaterial) {
      return res.status(404).json({ message: "Lecture material not found" });
    }
    res.json(lectureMaterial);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching lecture material",
        error: error.message,
      });
  }
};

// Update a lecture material
exports.updateLectureMaterial = async (req, res) => {
  try {
    const lectureMaterial = await LectureMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(lectureMaterial);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error updating lecture material",
        error: error.message,
      });
  }
};

// Delete a lecture material
exports.deleteLectureMaterial = async (req, res) => {
  try {
    await LectureMaterial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lecture material successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting lecture material",
        error: error.message,
      });
  }
};

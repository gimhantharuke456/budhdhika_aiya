const Supplement = require("../models/Suppliment.model");

// Create a new supplement
exports.createSupplement = async (req, res) => {
  try {
    const newSupplement = await Supplement.create(req.body);
    res.status(201).json(newSupplement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating supplement", error: error.message });
  }
};

// Get all supplements
exports.getAllSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.json(supplements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching supplements", error: error.message });
  }
};

// Get a supplement by ID
exports.getSupplementById = async (req, res) => {
  try {
    const supplement = await Supplement.findById(req.params.id);
    if (!supplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }
    res.json(supplement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching supplement", error: error.message });
  }
};

// Update a supplement by ID
exports.updateSupplementById = async (req, res) => {
  try {
    const updatedSupplement = await Supplement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }
    res.json(updatedSupplement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating supplement", error: error.message });
  }
};

// Delete a supplement by ID
exports.deleteSupplementById = async (req, res) => {
  try {
    const deletedSupplement = await Supplement.findByIdAndDelete(req.params.id);
    if (!deletedSupplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }
    res.json({ message: "Supplement deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting supplement", error: error.message });
  }
};

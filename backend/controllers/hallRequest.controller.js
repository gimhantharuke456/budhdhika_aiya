const HallRequest = require("../models/hallRequest.model");

// Create a new hall request
exports.createHallRequest = async (req, res) => {
  try {
    const newRequest = await HallRequest.create(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all hall requests
exports.getAllHallRequests = async (req, res) => {
  try {
    const requests = await HallRequest.find().populate("createdBy");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hall requests by createdBy
exports.getRequestsByCreatedBy = async (req, res) => {
  const { createdBy } = req.params;
  try {
    const requests = await HallRequest.find({ createdBy });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a hall request
exports.updateHallRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await HallRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedRequest) {
      return res.status(404).json({ message: "Hall request not found" });
    }
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a hall request
exports.deleteHallRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRequest = await HallRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Hall request not found" });
    }
    res.json({ message: "Hall request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

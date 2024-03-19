const MaintenanceRequest = require("../models/MaintanceRequest.model");

// Create a new maintenance request
exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { createdBy, requestDetails } = req.body;
    const maintenanceRequest = new MaintenanceRequest({
      createdBy,
      requestDetails,
    });
    await maintenanceRequest.save();
    res.status(201).json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create maintenance request",
      error: error.message,
    });
  }
};

// Get all maintenance requests
exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find();
    res.json(maintenanceRequests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch maintenance requests",
      error: error.message,
    });
  }
};

// Get maintenance requests by user
exports.getMaintenanceRequestsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const maintenanceRequests = await MaintenanceRequest.find({
      createdBy: userId,
    });
    res.json(maintenanceRequests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch maintenance requests by user",
      error: error.message,
    });
  }
};

// Get a single maintenance request by ID
exports.getMaintenanceRequestById = async (req, res) => {
  const requestId = req.params.id;
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(requestId);
    if (!maintenanceRequest) {
      return res.status(404).json({ message: "Maintenance request not found" });
    }
    res.json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch maintenance request",
      error: error.message,
    });
  }
};

// Update a maintenance request
exports.updateMaintenanceRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
      requestId,
      req.body,
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update maintenance request",
      error: error.message,
    });
  }
};

// Delete a maintenance request
exports.deleteMaintenanceRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    await MaintenanceRequest.findByIdAndDelete(requestId);
    res.json({ message: "Maintenance request deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete maintenance request",
      error: error.message,
    });
  }
};

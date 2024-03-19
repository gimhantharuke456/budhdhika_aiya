const express = require("express");
const router = express.Router();
const maintenanceRequestController = require("../controllers/maintenanceRequestController");

// Create a new maintenance request
router.post("/", maintenanceRequestController.createMaintenanceRequest);

// Get all maintenance requests
router.get("/", maintenanceRequestController.getAllMaintenanceRequests);

// Get maintenance requests by user
router.get(
  "/user/:userId",
  maintenanceRequestController.getMaintenanceRequestsByUser
);

// Get a single maintenance request by ID
router.get("/:id", maintenanceRequestController.getMaintenanceRequestById);

// Update a maintenance request
router.put("/:id", maintenanceRequestController.updateMaintenanceRequest);

// Delete a maintenance request
router.delete("/:id", maintenanceRequestController.deleteMaintenanceRequest);

module.exports = router;

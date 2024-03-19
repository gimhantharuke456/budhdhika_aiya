const express = require("express");
const router = express.Router();
const supplementController = require("../controllers/supplement.controller");

// Create a new supplement
router.post("/", supplementController.createSupplement);

// Get all supplements
router.get("/", supplementController.getAllSupplements);

// Get a supplement by ID
router.get("/:id", supplementController.getSupplementById);

// Update a supplement by ID
router.put("/:id", supplementController.updateSupplementById);

// Delete a supplement by ID
router.delete("/:id", supplementController.deleteSupplementById);

module.exports = router;

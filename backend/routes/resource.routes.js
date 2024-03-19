const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");

// GET all resources
router.get("/", resourceController.getAllResources);

// GET resource by ID
router.get("/:id", resourceController.getResourceById);

// POST create a new resource
router.post("/", resourceController.createResource);

// PUT update resource by ID
router.put("/:id", resourceController.updateResource);

// DELETE delete resource by ID
router.delete("/:id", resourceController.deleteResource);

module.exports = router;

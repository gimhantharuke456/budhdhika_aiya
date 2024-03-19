const Resource = require("../models/Resource.model");

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resources", error: error.message });
  }
};

// Get resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resource", error: error.message });
  }
};

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create resource", error: error.message });
  }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update resource", error: error.message });
  }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete resource", error: error.message });
  }
};

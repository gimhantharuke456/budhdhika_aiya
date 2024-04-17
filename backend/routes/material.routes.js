const express = require("express");
const materialController = require("../controllers/material.controller");
const router = express.Router();

router.post("/materials", materialController.createMaterial);
router.get("/materials", materialController.getAllMaterials);
router.get("/materials/:id", materialController.getMaterialById);
router.put("/materials/:id", materialController.updateMaterial);
router.delete("/materials/:id", materialController.deleteMaterial);

module.exports = router;

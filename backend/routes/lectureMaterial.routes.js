const express = require("express");
const router = express.Router();
const {
  createLectureMaterial,
  getAllLectureMaterials,
  getLectureMaterialById,
  updateLectureMaterial,
  deleteLectureMaterial,
} = require("../controllers/lectureMaterial.controller");

router.post("/", createLectureMaterial);
router.get("/", getAllLectureMaterials);
router.get("/:id", getLectureMaterialById);
router.put("/:id", updateLectureMaterial);
router.delete("/:id", deleteLectureMaterial);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createMarking,
  getAllMarkings,
  getMarkingById,
  updateMarking,
  deleteMarking,
} = require("../controllers/marking.controller");

router.post("/", createMarking);
router.get("/", getAllMarkings);
router.get("/:id", getMarkingById);
router.put("/:id", updateMarking);
router.delete("/:id", deleteMarking);

module.exports = router;

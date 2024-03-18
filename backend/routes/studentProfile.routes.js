const express = require("express");
const {
  createStudentProfile,
  getAllStudentProfiles,
  getStudentProfileById,
  updateStudentProfile,
  deleteStudentProfile,
  getProfileByEmail,
} = require("../controllers/studentProfile.controller");

const router = express.Router();

router.post("/", createStudentProfile);
router.get("/", getAllStudentProfiles);
router.get("/:id", getStudentProfileById);
router.get("/email/:id", getProfileByEmail);
router.put("/:id", updateStudentProfile);
router.delete("/:id", deleteStudentProfile);

module.exports = router;

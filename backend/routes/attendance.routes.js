const express = require("express");
const {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance.controller");

const router = express.Router();

router.post("/", createAttendance);
router.get("/", getAllAttendances);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;

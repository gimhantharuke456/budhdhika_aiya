const express = require("express");
const teacherRequestController = require("../controllers/teacherRequst.controller");
const router = express.Router();

router.post("/teacher-requests", teacherRequestController.createTeacherRequest);
router.get("/teacher-requests", teacherRequestController.getAllTeacherRequests);
router.get(
  "/teacher-requests/:id",
  teacherRequestController.getTeacherRequestById
);
router.put(
  "/teacher-requests/:id",
  teacherRequestController.updateTeacherRequest
);
router.delete(
  "/teacher-requests/:id",
  teacherRequestController.deleteTeacherRequest
);

module.exports = router;

const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

router.post("/teachers", teacherController.createTeacher);
router.get("/teachers", teacherController.getAllTeachers);
router.post("/teachers/login", teacherController.loginTeacher);
router.get("/teachers/:id", teacherController.getTeacherById);
router.put("/teachers/:id", teacherController.updateTeacher);
router.delete("/teachers/:id", teacherController.deleteTeacher);

module.exports = router;

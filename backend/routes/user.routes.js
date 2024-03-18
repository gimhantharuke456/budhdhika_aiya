// user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Get a single user by Email
router.get("/email/:email", userController.getUserByEmail);

// Update a user
router.put("/:id", userController.updateUser);

// Delete a user
router.delete("/:id", userController.deleteUser);

// Route to request password reset
router.post("/requestPasswordReset", userController.requestPasswordReset);

// Route to reset the password
router.post("/resetPassword", userController.resetPassword);

module.exports = router;

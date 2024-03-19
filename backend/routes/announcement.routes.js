const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");

// Route to create a new announcement
router.post("/", announcementController.createAnnouncement);

// Route to get all announcements
router.get("/", announcementController.getAllAnnouncements);

// Route to get a single announcement by ID
router.get("/:id", announcementController.getAnnouncementById);

// Route to update an existing announcement
router.put("/:id", announcementController.updateAnnouncement);

// Route to delete an announcement
router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;

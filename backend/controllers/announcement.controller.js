const Announcement = require("../models/Announcement.model");

// Controller to create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({ title, message });
    const savedAnnouncement = await announcement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create announcement", error: error.message });
  }
};

// Controller to get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch announcements", error: error.message });
  }
};

// Controller to get a single announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch announcement", error: error.message });
  }
};

// Controller to update an existing announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(updatedAnnouncement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update announcement", error: error.message });
  }
};

// Controller to delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete announcement", error: error.message });
  }
};

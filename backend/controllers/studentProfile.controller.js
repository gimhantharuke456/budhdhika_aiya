const StudentProfile = require("../models/StudentProfile.model");
const User = require("../models/User.model");
// Create a new student profile
exports.createStudentProfile = async (req, res) => {
  try {
    const profile = new StudentProfile(req.body);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({
      message: "Error creating student profile",
      error: error.message,
    });
  }
};

// Get all student profiles
exports.getAllStudentProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find()
      .populate("user")
      .populate("courses");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student profiles",
      error: error.message,
    });
  }
};

// Get a single student profile by ID
exports.getStudentProfileById = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id)
      .populate("user")
      .populate("courses");
    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student profile",
      error: error.message,
    });
  }
};
// Get a single student profile by ID
exports.getProfileByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id });

    const profile = await StudentProfile.findOne({ user: user._id });
    // .populate("user")
    // .populate("courses");
    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student profile",
      error: error.message,
    });
  }
};

// Update a student profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({
      message: "Error updating student profile",
      error: error.message,
    });
  }
};

// Delete a student profile
exports.deleteStudentProfile = async (req, res) => {
  try {
    const deletedProfile = await StudentProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json({ message: "Student profile deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student profile",
      error: error.message,
    });
  }
};

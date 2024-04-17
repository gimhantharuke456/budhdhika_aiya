const TeacherRequest = require("../models/teacherRequest.model");

exports.createTeacherRequest = async (req, res) => {
  try {
    const teacherRequest = new TeacherRequest({
      ...req.body,
    });
    await teacherRequest.save();
    res.status(201).json(teacherRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTeacherRequests = async (req, res) => {
  try {
    const teacherRequests = await TeacherRequest.find().populate("teacher");
    res.status(200).json(teacherRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherRequestById = async (req, res) => {
  try {
    const teacherRequest = await TeacherRequest.findById(
      req.params.id
    ).populate("teacher");
    if (!teacherRequest) {
      return res.status(404).json({ message: "Teacher request not found" });
    }
    res.status(200).json(teacherRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTeacherRequest = async (req, res) => {
  try {
    const teacherRequest = await TeacherRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!teacherRequest) {
      return res.status(404).json({ message: "Teacher request not found" });
    }
    res.status(200).json(teacherRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeacherRequest = async (req, res) => {
  try {
    const teacherRequest = await TeacherRequest.findByIdAndDelete(
      req.params.id
    );
    if (!teacherRequest) {
      return res.status(404).json({ message: "Teacher request not found" });
    }
    res.status(200).json({ message: "Teacher request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

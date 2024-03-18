const Attendance = require("../models/Attendance.model");

exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating attendance record", error });
  }
};

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate("course");
    res.json(attendances);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attendance records", error });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      "course"
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attendance record", error });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(attendance);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating attendance record", error });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Attendance record successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting attendance record", error });
  }
};

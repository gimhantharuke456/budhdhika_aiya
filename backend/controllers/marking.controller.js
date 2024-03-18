const Marking = require("../models/Marking.model");

exports.createMarking = async (req, res) => {
  try {
    const marking = new Marking(req.body);
    await marking.save();
    res.status(201).json(marking);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating marking", error: error.message });
  }
};

exports.getAllMarkings = async (req, res) => {
  try {
    const markings = await Marking.find()
      .populate("course")
      .populate("student");
    res.json(markings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching markings", error: error.message });
  }
};

exports.getMarkingById = async (req, res) => {
  try {
    const marking = await Marking.findById(req.params.id)
      .populate("course")
      .populate("student");
    if (!marking) {
      return res.status(404).json({ message: "Marking not found" });
    }
    res.json(marking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching marking", error: error.message });
  }
};

exports.updateMarking = async (req, res) => {
  try {
    const marking = await Marking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(marking);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating marking", error: error.message });
  }
};

exports.deleteMarking = async (req, res) => {
  try {
    await Marking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Marking successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting marking", error: error.message });
  }
};

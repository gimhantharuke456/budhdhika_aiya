const Notice = require("../models/notice.model");

exports.createNotice = async (req, res) => {
  try {
    const notice = new Notice({
      title: req.body.title,
      content: req.body.content,
    });
    await notice.save();
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

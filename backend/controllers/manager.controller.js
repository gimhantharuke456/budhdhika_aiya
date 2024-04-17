const Manager = require("../models/manager.model");
const bcrypt = require("bcryptjs");

exports.registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const managerExists = await Manager.findOne({ email });

    if (managerExists) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    const manager = new Manager({ name, email, password });
    await manager.save();

    res.status(201).json({ message: "Manager created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });

    if (manager && (await manager.matchPassword(password))) {
      res.status(200).json({
        _id: manager._id,
        name: manager.name,
        email: manager.email,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

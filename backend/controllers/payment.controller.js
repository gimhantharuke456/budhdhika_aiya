const Payment = require("../models/Payment.model");

// Create a payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating payment", error: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("payedBy");
    res.json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: error.message });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("payedBy");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching payment", error: error.message });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(payment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating payment", error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Payment successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting payment", error: error.message });
  }
};

const MoneyTransaction = require("../models/MoneyTransaction.model");

// Controller functions for handling money transactions

// Get all money transactions
const getAllMoneyTransactions = async (req, res) => {
  try {
    const transactions = await MoneyTransaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific money transaction by ID
const getMoneyTransactionById = async (req, res) => {
  try {
    const transaction = await MoneyTransaction.findById(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new money transaction
const createMoneyTransaction = async (req, res) => {
  const transaction = new MoneyTransaction({
    type: req.body.type,
    amount: req.body.amount,
    givenBy: req.body.givenBy,
    description: req.body.description,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a money transaction
const updateMoneyTransaction = async (req, res) => {
  try {
    const transaction = await MoneyTransaction.findById(req.params.id);
    if (transaction) {
      transaction.type = req.body.type;
      transaction.amount = req.body.amount;
      transaction.givenBy = req.body.givenBy;
      transaction.description = req.body.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a money transaction
const deleteMoneyTransaction = async (req, res) => {
  try {
    await MoneyTransaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMoneyTransactions,
  getMoneyTransactionById,
  createMoneyTransaction,
  updateMoneyTransaction,
  deleteMoneyTransaction,
};

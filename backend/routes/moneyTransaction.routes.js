const express = require("express");
const router = express.Router();
const {
  getAllMoneyTransactions,
  getMoneyTransactionById,
  createMoneyTransaction,
  updateMoneyTransaction,
  deleteMoneyTransaction,
} = require("../controllers/moneyTransactionController");

// Routes for handling money transactions

// GET all money transactions
router.get("/", getAllMoneyTransactions);

// GET a specific money transaction by ID
router.get("/:id", getMoneyTransactionById);

// POST create a new money transaction
router.post("/", createMoneyTransaction);

// PUT update a money transaction
router.put("/:id", updateMoneyTransaction);

// DELETE a money transaction
router.delete("/:id", deleteMoneyTransaction);

module.exports = router;

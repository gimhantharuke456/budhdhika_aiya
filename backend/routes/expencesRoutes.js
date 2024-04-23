const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Routes for handling expenses

// Get all expenses
router.get("/", expenseController.getAllExpenses);

// Create a new expense
router.post("/", expenseController.createExpense);

// Update an expense
router.put("/:id", expenseController.updateExpense);

// Delete an expense
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;

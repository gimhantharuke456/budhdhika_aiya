import axios from "axios";

const BASE_URL = "http://localhost:8080/api/expences";

class ExpenseService {
  static async getAllExpenses() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching expenses:", error);
      throw error;
    }
  }

  static async createExpense(newExpense) {
    try {
      const response = await axios.post(BASE_URL, newExpense);
      return response.data;
    } catch (error) {
      console.error("Error while creating expense:", error);
      throw error;
    }
  }

  static async updateExpense(expenseId, updatedExpense) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${expenseId}`,
        updatedExpense
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating expense with ID ${expenseId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteExpense(expenseId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${expenseId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting expense with ID ${expenseId}:`,
        error
      );
      throw error;
    }
  }
}

export default ExpenseService;

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/money-transactions";

class MoneyTransactionService {
  static async getAllMoneyTransactions() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching money transactions:", error);
      throw error;
    }
  }

  static async createMoneyTransaction(newTransaction) {
    try {
      const response = await axios.post(BASE_URL, newTransaction);
      return response.data;
    } catch (error) {
      console.error("Error while creating money transaction:", error);
      throw error;
    }
  }

  static async updateMoneyTransaction(transactionId, updatedTransaction) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${transactionId}`,
        updatedTransaction
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating money transaction with ID ${transactionId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteMoneyTransaction(transactionId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting money transaction with ID ${transactionId}:`,
        error
      );
      throw error;
    }
  }
}

export default MoneyTransactionService;

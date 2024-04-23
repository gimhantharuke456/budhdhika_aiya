import axios from "axios";

const BASE_URL = "http://localhost:8080/api/payments";

class PaymentService {
  // Get all payments
  static async getAllPayments() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  // Get payment by ID
  static async getPaymentById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  // Create a new payment
  static async createPayment(paymentData) {
    try {
      const response = await axios.post(BASE_URL, paymentData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  // Update payment by ID
  static async updatePayment(id, updatedPaymentData) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedPaymentData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  // Delete payment by ID
  static async deletePayment(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
}

export default PaymentService;

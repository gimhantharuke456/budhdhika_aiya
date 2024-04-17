import axios from "axios";

const BASE_URL = "http://localhost:8080/api/feedbacks";

class FeedbackController {
  static async getAllFeedbacks() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching feedbacks:", error);
      throw error;
    }
  }

  static async createFeedback(newFeedback) {
    try {
      const response = await axios.post(BASE_URL, newFeedback);
      return response.data;
    } catch (error) {
      console.error("Error while creating feedback:", error);
      throw error;
    }
  }

  static async updateFeedback(feedbackId, updatedFeedback) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${feedbackId}`,
        updatedFeedback
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating feedback with ID ${feedbackId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteFeedback(feedbackId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${feedbackId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting feedback with ID ${feedbackId}:`,
        error
      );
      throw error;
    }
  }
}

export default FeedbackController;

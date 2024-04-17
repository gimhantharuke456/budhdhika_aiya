import axios from "axios";

const BASE_URL = "http://localhost:8080/api/requests";

class RequestController {
  static async getAllRequests() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching requests:", error);
      throw error;
    }
  }

  static async createRequest(newRequest) {
    try {
      const response = await axios.post(BASE_URL, newRequest);
      return response.data;
    } catch (error) {
      console.error("Error while creating request:", error);
      throw error;
    }
  }

  static async updateRequest(requestId, updatedRequest) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${requestId}`,
        updatedRequest
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating request with ID ${requestId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteRequest(requestId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${requestId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting request with ID ${requestId}:`,
        error
      );
      throw error;
    }
  }
}

export default RequestController;

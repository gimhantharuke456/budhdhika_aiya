import axios from "axios";

const BASE_URL = "http://localhost:8080/api/notices";

class NoticeController {
  static async getAllNotices() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching notices:", error);
      throw error;
    }
  }

  static async createNotice(newNotice) {
    try {
      const response = await axios.post(BASE_URL, newNotice);
      return response.data;
    } catch (error) {
      console.error("Error while creating notice:", error);
      throw error;
    }
  }

  static async updateNotice(noticeId, updatedNotice) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${noticeId}`,
        updatedNotice
      );
      return response.data;
    } catch (error) {
      console.error(`Error while updating notice with ID ${noticeId}:`, error);
      throw error;
    }
  }

  static async deleteNotice(noticeId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${noticeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting notice with ID ${noticeId}:`, error);
      throw error;
    }
  }
}

export default NoticeController;

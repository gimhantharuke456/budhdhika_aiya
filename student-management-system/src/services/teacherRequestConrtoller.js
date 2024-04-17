import axios from "axios";

const BASE_URL = "http://localhost:8080/api/teacher-requests";

class TeacherRequestController {
  // Method to retrieve all teachers
  static async getAllTeachersRequests() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching teachers:", error);
      throw error;
    }
  }

  // Method to retrieve a single teacher by ID
  static async getTeacherRequestById(teacherId) {
    try {
      const response = await axios.get(`${BASE_URL}/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while fetching teacher with ID ${teacherId}:`,
        error
      );
      throw error;
    }
  }

  // Method to create a new teacher
  static async createTeacherRequest(newTeacher) {
    try {
      const response = await axios.post(BASE_URL, newTeacher);
      return response.data;
    } catch (error) {
      console.error("Error while creating teacher:", error);
      throw error;
    }
  }

  // Method to update an existing teacher
  static async updateTeacherRequest(teacherId, updatedTeacher) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${teacherId}`,
        updatedTeacher
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating teacher with ID ${teacherId}:`,
        error
      );
      throw error;
    }
  }

  // Method to delete a teacher
  static async deleteTeacherRequest(teacherId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting teacher with ID ${teacherId}:`,
        error
      );
      throw error;
    }
  }
}

export default TeacherRequestController;

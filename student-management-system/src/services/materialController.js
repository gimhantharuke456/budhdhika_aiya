import axios from "axios";

const BASE_URL = "http://localhost:8080/api/materials";

class MaterialController {
  static async getAllMaterials() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error while fetching materials:", error);
      throw error;
    }
  }

  static async createMaterial(newMaterial) {
    try {
      const response = await axios.post(BASE_URL, newMaterial);
      return response.data;
    } catch (error) {
      console.error("Error while creating material:", error);
      throw error;
    }
  }

  static async updateMaterial(materialId, updatedMaterial) {
    try {
      const response = await axios.put(
        `${BASE_URL}/${materialId}`,
        updatedMaterial
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error while updating material with ID ${materialId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteMaterial(materialId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${materialId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error while deleting material with ID ${materialId}:`,
        error
      );
      throw error;
    }
  }
}

export default MaterialController;

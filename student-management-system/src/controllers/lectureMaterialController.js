import API from "../utils/api";

export const fetchLectureMaterials = () => API.get("/lectureMaterials");
export const fetchLectureMaterialById = (id) =>
  API.get(`/lectureMaterials/${id}`);
export const createLectureMaterial = (materialData) =>
  API.post("/lectureMaterials", materialData);
export const updateLectureMaterial = (id, updatedMaterial) =>
  API.put(`/lectureMaterials/${id}`, updatedMaterial);
export const deleteLectureMaterial = (id) =>
  API.delete(`/lectureMaterials/${id}`);

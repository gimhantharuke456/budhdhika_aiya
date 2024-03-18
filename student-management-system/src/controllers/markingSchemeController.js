import API from "../utils/api";

export const fetchMarkingSchemes = () => API.get("/markings");
export const fetchMarkingSchemeById = (id) => API.get(`/markings/${id}`);
export const createMarkingScheme = (schemeData) =>
  API.post("/markings", schemeData);
export const updateMarkingScheme = (id, updatedScheme) =>
  API.put(`/markings/${id}`, updatedScheme);
export const deleteMarkingScheme = (id) => API.delete(`/markings/${id}`);

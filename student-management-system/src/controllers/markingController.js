import API from "../utils/api";

export const fetchMarkings = () => API.get("/markings");
export const fetchMarkingById = (id) => API.get(`/markings/${id}`);
export const createMarking = (markingData) =>
  API.post("/markings", markingData);
export const updateMarking = (id, updatedMarking) =>
  API.put(`/markings/${id}`, updatedMarking);
export const deleteMarking = (id) => API.delete(`/markings/${id}`);

import API from "../utils/api";

export const fetchMaintenanceRequests = () => API.get("/maintenance");
export const fetchMaintenanceRequestById = (id) =>
  API.get(`/maintenance/${id}`);
export const createMaintenanceRequest = (maintenanceRequestData) =>
  API.post("/maintenance", maintenanceRequestData);
export const updateMaintenanceRequest = (id, updatedMaintenanceRequest) =>
  API.put(`/maintenance/${id}`, updatedMaintenanceRequest);
export const deleteMaintenanceRequest = (id) =>
  API.delete(`/maintenance/${id}`);
export const fetchMaintenanceRequestsByUser = (userId) =>
  API.get(`/maintenance/user/${userId}`);

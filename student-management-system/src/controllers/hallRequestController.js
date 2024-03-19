import API from "../utils/api";

// Fetch all hall requests
export const fetchHallRequests = () => API.get("/hall-requests");

// Fetch a hall request by ID
export const fetchHallRequestById = (id) => API.get(`/hall-requests/${id}`);

// Fetch hall requests by user ID
export const fetchHallRequestByUser = (id) =>
  API.get(`/hall-requests/createdBy/${id}`);

// Create a new hall request
export const createHallRequest = (newRequest) =>
  API.post("/hall-requests", newRequest);

// Update an existing hall request
export const updateHallRequest = (id, updatedRequest) =>
  API.put(`/hall-requests/${id}`, updatedRequest);

// Delete a hall request
export const deleteHallRequest = (id) => API.delete(`/hall-requests/${id}`);

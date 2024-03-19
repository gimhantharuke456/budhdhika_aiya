import API from "../utils/api";

// Fetch all leave requests
export const fetchLeaveRequests = () => API.get("/leave");

// Fetch leave requests by createdBy
export const fetchLeaveRequestsByCreatedBy = (createdBy) =>
  API.get(`/leave/createdBy/${createdBy}`);

// Add a new leave request
export const addLeaveRequest = (leaveData) => API.post("/leave", leaveData);

// Update an existing leave request
export const updateLeaveRequest = (id, updatedLeaveData) =>
  API.put(`/leave/${id}`, updatedLeaveData);

// Delete a leave request
export const deleteLeaveRequest = (id) => API.delete(`/leave/${id}`);

import API from "../utils/api";

// Fetch all attendance records
export const fetchAttendanceRecords = () => API.get("/attendance");

// Fetch an attendance record by ID
export const fetchAttendanceRecordById = (id) => API.get(`/attendance/${id}`);

// Add a new attendance record
export const addAttendanceRecord = (attendanceData) =>
  API.post("/attendance", attendanceData);

// Update an existing attendance record
export const updateAttendanceRecord = (id, updatedAttendanceData) =>
  API.put(`/attendance/${id}`, updatedAttendanceData);

// Delete an attendance record
export const deleteAttendanceRecord = (id) => API.delete(`/attendance/${id}`);

import API from "../utils/api";

// Fetch all about Suppliments
export const fetchAboutSuppliments = () => API.get("/supplements");

// Fetch an about record by ID
export const fetchAboutRecordById = (id) => API.get(`/supplements/${id}`);

// Add a new about record
export const addAboutRecord = (aboutData) =>
  API.post("/supplements", aboutData);

// Update an existing about record
export const updateAboutRecord = (id, updatedAboutData) =>
  API.put(`/supplements/${id}`, updatedAboutData);

// Delete an about record
export const deleteAboutRecord = (id) => API.delete(`/supplements/${id}`);

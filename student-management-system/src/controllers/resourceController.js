import API from "../utils/api";

// Fetch all resources
export const fetchResources = () => API.get("/resources");

// Fetch resource by ID
export const fetchResourceById = (id) => API.get(`/resources/${id}`);

// Create a new resource
export const createResource = (newResource) =>
  API.post("/resources", newResource);

// Update an existing resource
export const updateResource = (id, updatedResource) =>
  API.put(`/resources/${id}`, updatedResource);

// Delete a resource by ID
export const deleteResource = (id) => API.delete(`/resources/${id}`);

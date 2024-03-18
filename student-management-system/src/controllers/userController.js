import API from "../utils/api";

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);
export const fetchUsers = () => API.get("/users");
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const fetchUserByEmail = (email) => API.get(`/users/email/${email}`);
export const updateUser = (id, updatedUser) =>
  API.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const resetUserPassword = (resetData) =>
  API.post("/users/requestPasswordReset", resetData);

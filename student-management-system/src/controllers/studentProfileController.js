import API from "../utils/api";

export const fetchStudentProfiles = () => API.get("/studentProfiles");
export const fetchStudentProfileById = (id) =>
  API.get(`/studentProfiles/${id}`);
export const fetchStudentProfileByEmail = (email) =>
  API.get(`/studentProfiles/email/${email}`);
export const createStudentProfile = (profileData) =>
  API.post("/studentProfiles", profileData);
export const updateStudentProfile = (id, updatedProfile) =>
  API.put(`/studentProfiles/${id}`, updatedProfile);
export const deleteStudentProfile = (id) =>
  API.delete(`/studentProfiles/${id}`);

import API from "../utils/api";

export const fetchEnrollments = () => API.get("/enrollments");
export const enrollStudent = (enrollmentData) =>
  API.post("/enrollments", enrollmentData);
export const deleteEnrollment = (id) => API.delete(`/enrollments/${id}`);

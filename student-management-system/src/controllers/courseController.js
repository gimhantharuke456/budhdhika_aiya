import API from "../utils/api";

export const fetchCourses = () => API.get("/courses");
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (newCourse) => API.post("/courses", newCourse);
export const updateCourse = (id, updatedCourse) =>
  API.put(`/courses/${id}`, updatedCourse);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

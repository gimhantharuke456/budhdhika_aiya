import API from "../utils/api";

export const fetchFeedbacks = () => API.get("/feedbacks");
export const fetchFeedbackById = (id) => API.get(`/feedbacks/${id}`);
export const createFeedback = (newFeedback) =>
  API.post("/feedbacks", newFeedback);
export const updateFeedback = (id, updatedFeedback) =>
  API.put(`/feedbacks/${id}`, updatedFeedback);
export const deleteFeedback = (id) => API.delete(`/feedbacks/${id}`);

import API from "../utils/api";

// Fetch all suppliment feedbacks
export const fetchSupplimentFeedbacks = () => API.get("/supplimentFeedbacks");

// Fetch feedbacks by suppliment
export const fetchFeedbacksBySuppliment = (supplimentId) =>
  API.get(`/supplimentFeedbacks/suppliment/${supplimentId}`);

// Add a new feedback
export const addFeedback = (feedbackData) =>
  API.post("/supplimentFeedbacks", feedbackData);

// Update an existing feedback
export const updateFeedback = (id, updatedFeedbackData) =>
  API.put(`/supplimentFeedbacks/${id}`, updatedFeedbackData);

// Delete a feedback
export const deleteFeedback = (id) => API.delete(`/supplimentFeedbacks/${id}`);

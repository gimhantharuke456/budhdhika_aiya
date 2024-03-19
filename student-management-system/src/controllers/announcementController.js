import API from "../utils/api";

export const fetchAnnouncements = () => API.get("/announcements");
export const fetchAnnouncementById = (id) => API.get(`/announcements/${id}`);
export const createAnnouncement = (newAnnouncement) =>
  API.post("/announcements", newAnnouncement);
export const updateAnnouncement = (id, updatedAnnouncement) =>
  API.put(`/announcements/${id}`, updatedAnnouncement);
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);

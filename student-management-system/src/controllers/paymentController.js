import API from "../utils/api";

export const fetchPayments = () => API.get("/payments");
export const fetchPaymentById = (id) => API.get(`/payments/${id}`);
export const createPayment = (newPayment) => API.post("/payments", newPayment);
export const updatePayment = (id, updatedPayment) =>
  API.put(`/payments/${id}`, updatedPayment);
export const deletePayment = (id) => API.delete(`/payments/${id}`);

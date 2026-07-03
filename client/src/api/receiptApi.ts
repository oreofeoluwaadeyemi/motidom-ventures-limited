import axios from "axios";

const api = axios.create({
  baseURL: "https://motidom-ventures-limited-1.onrender.com",
});

export const createReceipt = (data: any) =>
  api.post("/receipts", data);

export const getReceipt = (id: string) =>
  api.get(`/receipts/${id}`);

export const getReceipts = () =>
  api.get("/receipts");

export const deleteReceipt = (id: string) =>
  api.delete(`/receipts/${id}`);

export default api;
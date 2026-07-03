import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2000/api",
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
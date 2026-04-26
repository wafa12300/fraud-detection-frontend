import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getClients = () => axios.get(`${API}/clients`);
export const blockClient = (id) => axios.post(`${API}/block-client/${id}`);
export const unblockClient = (id) => axios.post(`${API}/unblock-client/${id}`);
export const deleteClient = (id) => axios.delete(`${API}/delete-client/${id}`);
export const predictFraud = (data) => axios.post(`${API}/predict`, data);
export const getTransactions = () => axios.get(`${API}/transactions`);
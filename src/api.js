import axios from "axios";

const API = "http://127.0.0.1:8000";

export const predictFraud = (data) => {
  return axios.post(`${API}/predict`, data);
};

export const getClients = () => {
  return axios.get(`${API}/clients`);
};
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const predictFraud = async (data) => {
  const res = await axios.post(`${API_URL}/predict`, data);
  return res.data;
};
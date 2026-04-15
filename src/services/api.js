import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

/* GET all transactions */
export const getTransactions = () => {
  return API.get("/transactions");
};

/* NEW prediction (fraud detection) */
export const addTransaction = (data) => {
  return API.post("/predict", data);
};
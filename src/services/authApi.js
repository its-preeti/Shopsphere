import axios from "axios";

const API = axios.create({
  baseURL: "https://shopsphere-backend-nl6r.onrender.com/api/auth",
});

// REGISTER
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};
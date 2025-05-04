import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
  // baseURL: "https://delivery-server-3zkl.onrender.com/api/",
  baseURL: "http://localhost:4000/api/",
  headers: {
    Authorization: token,
  },
});

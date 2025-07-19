import axios from "axios";

const token = localStorage.getItem("token");

export const Fetch = axios.create({
  baseURL: "http://tdp21.mukammal-crm.uz/",
  // baseURL: "http://localhost:4000/api/",
  headers: {
    Authorization: token,
  },
});

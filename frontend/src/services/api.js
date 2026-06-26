import axios from "axios";

const API = axios.create({
  baseURL: "https://blogsphere-backend-4pbj.onrender.com/api",
});

export default API;
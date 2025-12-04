import axios from "axios";
import appConstants from "../_constants/appConstants";

let defaultAPIVersion = "/v1";
const api = axios.create({
  baseURL: `${appConstants.apiEndpoint || "http://localhost:3001/api"}${defaultAPIVersion}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("config in request interceptor", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;


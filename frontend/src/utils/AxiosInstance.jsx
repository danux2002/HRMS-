import axios from "axios";
import Cookies from "js-cookie";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: `https://${process.env.HOST}:${process.env.PORT}/api/`,
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get("authToken");

    // If token exists, set the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

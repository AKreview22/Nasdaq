import axios, { AxiosInstance, AxiosError } from "axios";
import axiosRetry from "axios-retry";
import rateLimit from "axios-rate-limit";

export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Create an axios instance with rate limiting
const axiosInstance: AxiosInstance = rateLimit(
  axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  }),
  {
    maxRequests: 5,
    perMilliseconds: 60000,
    maxRPS: 5,
  }
);

axiosRetry(axiosInstance, {
  retries: 3,
  retryCondition: (error: AxiosError) => {
    if (error.response) {
      return error.response.status === 429;
    }
    return false;
  },
  retryDelay: () => {
    return 60000;
  },
});

export default axiosInstance;

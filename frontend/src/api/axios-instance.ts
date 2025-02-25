// src/api/axiosInstance.ts
import { clearTokensCookie, setTokens } from '@/lib/utils';
import axios from 'axios';
import Cookies from "js-cookie";

const baseURL = "/api"; //import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL, // Use environment variable for base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Get the original request
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Retry the original request with the new token
      originalRequest._retry = true;
      const currRefreshToken = Cookies.get("refresh_token");

      try {
        // Attempt to refresh the token
        const response = await axios.post(`${baseURL}/auth/refresh-tokens`, { refreshToken: currRefreshToken });
        const { accessToken, refreshToken } = response.data;

        setTokens(accessToken, refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        onSignout();
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export const onSignout = async () => {
  clearTokensCookie();

  if(window.location.pathname === '/') {
    return;
  }

  if (window.location.pathname !== '/404') {
    window.location.href = '/login';
  }
};

export default axiosInstance;
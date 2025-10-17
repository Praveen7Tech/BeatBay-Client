import axios from 'axios';
import { store } from '../store/store';
import { logout, setAccessToken } from '../../features/auth/slices/authSlice';
import { AuthState } from '../../features/auth/slices/authSlice'; // Make sure to export this interface from your slice

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: Allows cookies (including HttpOnly ones) to be sent
});

// A private variable to prevent multiple refresh requests at once
let isRefreshing = false;
let failedRequestsQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// Function to process the queue of failed requests
const processQueue = (error: any, token: string | null = null) => {
  failedRequestsQueue.forEach(req => {
    if (error) {
      req.reject(error);
    } else {
      req.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Request Interceptor: Attach access token from Redux store
axiosInstance.interceptors.request.use(
  (config) => {
    const state: AuthState = store.getState().auth;
    const accessToken = state.accessToken; // Assumes your state has an `accessToken` field
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiry and refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const state: AuthState = store.getState().auth;

    // Retry logic for 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/refresh-token')) {
        // refresh itself failed -> logout
        store.dispatch(logout());
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;


      try {
        // Make request to refresh token endpoint
        const response = await axiosInstance.post('/user/refresh-token'); // Your backend's refresh endpoint
        ("err 1 2 3", response)
        const newAccessToken = response.data.accessToken;

        // Update the access token in Redux
        store.dispatch(setAccessToken(newAccessToken));
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);

      } catch (refreshError: any) {
        // If refresh fails, log the user out
        store.dispatch(logout());
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


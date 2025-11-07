import axios from 'axios';
import { store } from '../store/store';
import { logout, setAccessToken } from '../../features/auth/slices/authSlice';
import { AuthState } from '../../features/auth/slices/authSlice'; 
import { API_ROUTES } from './apiRoutes';

const API_URL = import.meta.env.VITE_API_URL

export const axiosInstance = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true, 
});



// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state: AuthState = store.getState().auth;
    const accessToken = state.accessToken; 
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if(!(config.data instanceof FormData)){
      config.headers['Content-Type'] = 'application/json'
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth-status')) {
        // If the refresh token itself failed, log out
        store.dispatch(logout());
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const response = await axiosInstance.get(API_ROUTES.AUTH_STATUS); 
        const { accessToken } = response.data;

        if (accessToken) {
            store.dispatch(setAccessToken(accessToken));
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
        } else {
            store.dispatch(logout());
            return Promise.reject(error);
        }

      } catch (refreshError: any) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


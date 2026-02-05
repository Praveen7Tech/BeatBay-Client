import axios from 'axios';
import { store } from '../store/store';
import { logout, setAccessToken } from '../../features/auth/slices/authSlice';
import { AuthState } from '../../features/auth/slices/authSlice'; 
import { API_ROUTES } from './apiRoutes';
import { StatusCodeEnum } from '../enum/statuscode.enym';

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
    const statusCode = error.response?.status;
    // hanle blocked users when using the page
    const StatusCode = error.response?.status
    if(StatusCode === StatusCodeEnum.FORBIDDEN){
      console.log("403")
      window.location.href = API_ROUTES.UNAUTHARIZED
      return Promise.reject(error)
    }

    if (error.response?.status === StatusCodeEnum.UNAUTHORIZED && !originalRequest._retry) {
      if (originalRequest.url?.includes(API_ROUTES.AUTH_CHECK)) {
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

     const errorMessage = error.response?.data?.message || "An unexpected error occurred";
    
    // new Error object with the backend message
    const flattenedError = new Error(errorMessage);
    
    (flattenedError as any).status = statusCode;

    return Promise.reject(flattenedError);

  }
);


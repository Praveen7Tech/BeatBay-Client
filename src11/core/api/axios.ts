import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const axiosInstace = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type':'application/json'
    }
})

// Request Interceptor
axiosInstace.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        Promise.reject(error)
    }
)

// Response Interceptor
axiosInstace.interceptors.response.use(
    (response)=> response,
    (error)=>{
        const originalRequest = error.config

        // 401 (expiry token)
        if(error.response.status === 401 && ! originalRequest._retry){
            originalRequest._retry = true

            store.dispatch(logout())
            window.location.href = '/login'
        }
    }
)
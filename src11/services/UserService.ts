import { API_ROUTES } from "../core/api/apiRoutes"
import { axiosInstace } from "../core/api/axios"

interface Signup {
    name: string,
    email : string,
    password : string
}

interface SignUpResponse {
    message: string,
    token : string,
    user:{
        id:string,
        name:string,
        email:string,
        role:string
    }
}

interface verifyOtpResponse {
    message : string
}


export const userService = {
    signUp : async(data: Signup) : Promise<SignUpResponse> => {
        const response = await axiosInstace.post<SignUpResponse>(API_ROUTES.SIGNUP, data)
        console.log("re dt",response)
        return response.data
    },

    verifyOTP : async(email: string, otp: string) : Promise<verifyOtpResponse> =>{
        const response = await axiosInstace.post<verifyOtpResponse>(API_ROUTES.VERIFY_OTP,{email,otp})
        console.log("res ot", response)
        return response.data
    },

    resendOTP : async(email: string) : Promise<verifyOtpResponse> =>{
        const response = await axiosInstace.post<verifyOtpResponse>(API_ROUTES.RESEND_OTP,{email})
        return response.data
    }
}
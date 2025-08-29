import api from "../lib/axios"

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
        const response = await api.post<SignUpResponse>("/user/signup", data)
        console.log("re dt",response)
        return response.data
    },

    verifyOTP : async(email: string, otp: string) : Promise<verifyOtpResponse> =>{
        const response = await api.post<verifyOtpResponse>("/user/verify-otp",{email,otp})
        console.log("res ot", response)
        return response.data
    }
}
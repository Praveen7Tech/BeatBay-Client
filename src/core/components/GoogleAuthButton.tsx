import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useApi } from "../hooks/useApi";
import { authApi } from "../../features/auth/services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/slices/authSlice";
import { useNavigate } from "react-router-dom";

export function GoogleAuthButton() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {execute: GoogleSignup} = useApi(authApi.googleSignup)

    const GoogleSignUp = useGoogleLogin({
        onSuccess: async(credentialRes)=> {
            try {
                const token = credentialRes.access_token
                if(!token) return
                const res  = await GoogleSignup({token})
                if(res){
                    dispatch(loginSuccess({user: res.user, accessToken: res.accessToken}))
                    navigate('/home')
                }
            } catch (error) {
                console.error("error in google auth")
            }
        },
        onError :()=> console.error("google signup error..!")
    })

    return (
        <div onClick={()=> GoogleSignUp()} className="w-full max-w-xs flex items-center justify-center">
        <img
          src="/logos/g.png"
          alt="Google"
          className=" h-10 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    )
}
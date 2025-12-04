import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useApi } from "@/core/hooks/api/useApi"; 
import { authApi } from "@/features/auth/services/authApi"; 
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/slices/authSlice"; 
import { useNavigate } from "react-router-dom";
import { authApiArtist } from "@/features/artist/services/artist-authApi";

interface GoogleAuthProps {
  role: "user" | "artist";
}

export function GoogleAuthButton({role}:GoogleAuthProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedApi = role === "user" ? authApi : authApiArtist;
    const { execute: GoogleSignup } = useApi(selectedApi.googleSignup);

    const onSuccess = async (credentialResponse:CredentialResponse) => {
        try {
            const idToken = credentialResponse.credential; 
            if (!idToken) return;

            const res = await GoogleSignup({ token: idToken });
            if (res) {
                dispatch(loginSuccess({ user: res.user, accessToken: res.accessToken }));
                navigate('/home');
            }
        } catch (error) {
            console.error("error in google auth", error);
        }
    };

    const onError = () => {
        console.error("google signup error..!");
    };

    return (
         <div className="w-full max-w-xs flex items-center justify-center relative">
            
            {/* The invisible Google IFrame that captures the click */}
            <div className="absolute inset-0 opacity-0 cursor-pointer">
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                    // The component needs to render a certain size for the hack to work
                    width="400" 
                />
            </div>
            <div>
                <img src="\logos\g.png" alt="Google Logo" className="w-24"/>
            </div>
        </div>
    );
}

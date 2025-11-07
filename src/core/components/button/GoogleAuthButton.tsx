import { GoogleLogin } from "@react-oauth/google";
import { useApi } from "@/core/hooks/useApi"; 
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

    const onSuccess = async (credentialResponse:any) => {
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
        <div className="w-full max-w-xs flex items-center justify-center">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                theme="filled_black"    // 'filled_blue', 'outline', 'filled_black'
                size="large"           // 'large', 'medium', 'small'
                text="continue_with"   // 'signin_with', 'signup_with', 'continue_with'
                shape="circle"           //  'rectangular', 'circle', or 'pill'
                logo_alignment="center"  // move Google logo to left or center
                width="10"
            />
        </div>
    );
}

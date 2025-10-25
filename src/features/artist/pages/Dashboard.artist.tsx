import { useDispatch } from "react-redux";
import { useApi } from "../../../core/hooks/useApi";
import { logout } from "../../auth/slices/authSlice";
import { Button } from "../components/ui/Button";
import { authApiArtist } from "../services/artist-authApi";


const ArtistDashboard = () => {
  const dispatch = useDispatch()

  const {execute: Logout} = useApi(authApiArtist.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      window.location.href='/artist'
    } catch (error) {
      console.error("error in logout", error)
    }
    
  };
  
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-semibold text-gray-200 mb-4">
        Welcome to ARTIST dashboard
      </h1>
     <div>
        <Button onClick={handleLogout}>
            Logout
        </Button>
     </div>
      
    </div>
  );
}

export default ArtistDashboard

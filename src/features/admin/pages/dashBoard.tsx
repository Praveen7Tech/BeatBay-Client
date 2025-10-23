
import { Button } from '../../../core/components/Button'; 
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/slices/authSlice'; 
import { useApi } from '../../../core/hooks/useApi'; 
import { authApiAdmin } from '../services/admin-AuthApi';

const dashBoard = () => {
  const dispatch = useDispatch()

  const {execute: Logout} = useApi(authApiAdmin.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      window.location.href='/admin'
    } catch (error) {
      console.error("error in logout", error)
    }
    
  };
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-semibold text-gray-200 mb-4">
        Welcome to admin dashboard
      </h1>

      <p className="text-gray-300 mb-6">
        You are successfully logged in!
      </p>

      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
        Logout
      </Button>
    </div>
  );
}

export default dashBoard

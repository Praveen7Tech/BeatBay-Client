import React from 'react'
import { Button } from '../core/components/Button';
import { data, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/slices/authSlice';
import { useApi } from '../core/hooks/useApi';
import { authApi } from '../features/auth/services/authApi';

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {execute: Logout} = useApi(authApi.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      navigate("/login");
    } catch (error) {
      console.error("error in logout", error)
    }
    
  };
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to the Home Page 👋
      </h1>

      <p className="text-gray-600 mb-6">
        You are successfully logged in!
      </p>

      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
        Logout
      </Button>
    </div>
  );
}

export default HomePage

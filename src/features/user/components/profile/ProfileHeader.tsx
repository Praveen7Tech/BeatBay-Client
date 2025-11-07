"use client";

import { Link } from "react-router-dom";
import { Pen, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/slices/authSlice";
import { useApi } from "@/core/hooks/useApi";
import { authApi } from "@/features/auth/services/authApi";
import { RootState } from "@/core/store/store";
import { Button } from "@/core/components/button/Button";

const URL = import.meta.env.VITE_API_URL;

export function ProfileHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { execute: Logout } = useApi(authApi.logout);

  const handleLogout = async () => {
    try {
      await Logout(null);
      dispatch(logout());
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <div className="relative h-52 bg-linear-to-b from-[#1a4d2e] to-[#0f0f0f] mt-0">
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-6 px-8 pb-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full border-4 border-[#0f0f0f] flex items-center justify-center shrink-0 overflow-hidden">
          {user.profilePicture ? (
            <img
              src={`${URL}/uploads/${user.profilePicture}`}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-4xl font-bold text-gray-600">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 pb-2">
          <Link to="/edit-profile">
            <div className="flex gap-6">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <Pen className="mt-2 text-gray-400 hover:text-white transition-colors" />
            </div>
          </Link>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-[#00d084] font-semibold">25</span>
              <span className="text-gray-400 ml-2">Following</span>
            </div>
            <div>
              <span className="text-[#00d084] font-semibold">467</span>
              <span className="text-gray-400 ml-2">Followers</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex gap-3 pb-2">
          <Button theme="user" variant="dashboard" onClick={handleLogout}>
             Log Out →
          </Button>
        </div>
      </div>
    </div>
  );
}

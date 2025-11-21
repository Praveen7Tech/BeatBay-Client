"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { Link } from "react-router-dom";

export function FollowingSection() {

  const { data: followers, isLoading, isError, error } = useQuery({
    queryKey: ["followingList"],
    queryFn: () => userApi.following()
  });

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }

  const URL = import.meta.env.VITE_API_URL;

  return (
    <div className="px-8 py-8 border-t border-[#2a2a2a]">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#00d084]">✓</span>
        <h2 className="text-xl font-bold">FOLLOWING</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">

        {/* When followers exist */}
        {followers && followers.length > 0 ? (
          followers.map((follow) => (
            <Link to={`/artist-details/${follow.id}`}>
            <div key={follow.id} className="flex flex-col items-center gap-3 shrink-0">

              {/* Image Circle */}
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-300 hover:scale-110 transition-transform cursor-pointer relative overflow-hidden">

                {/* Fallback Initial */}
                {!follow?.profilePicture && (
                  <span>{follow.name.charAt(0)}</span>
                )}

                {/* Profile Picture */}
                {follow?.profilePicture && (
                  <img
                    src={`${URL}/uploads/${follow.profilePicture}`}
                    alt={follow.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                )}
              </div>

              {/* Text Section */}
              <div className="text-center">
                <p className="text-sm font-semibold">{follow?.name}</p>
                <p className="text-xs text-gray-400">{follow?.role}</p>
              </div>

            </div>
            </Link>
          ))
        ) : (
          // Fallback when no followers exist
          <p className="p-4 text-gray-500">Oops, no following found.</p>
        )}

      </div>
    </div>
  );
}

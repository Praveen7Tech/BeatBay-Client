"use client";

import { Link } from "react-router-dom";
import { useUserFollowing } from "@/core/hooks/api/useFetchHooks";

export function FollowingSection() {

  const { data: followers, isLoading, isError, error } = useUserFollowing()

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-red-600 p-8">{error?.message}</div>;
  }

  return (
    <div className="px-8 py-8 border-t border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">FOLLOWING</h2>
         <Link to={`/following`}>
            <p className="text-[#00d084] text-sm hover:underline">
              Show All →
            </p>
          </Link>
      </div>

      <div className="flex gap-6 pb-4">

        {/* When followers exist */}
        {followers && followers.length > 0 ? (
          followers.map((follow) => (
            <Link to={`/artist/${follow.id}`}>
            <div key={follow.id} className="flex flex-col items-center gap-3 shrink-0">

              {/* Image Circle */}
              <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-300 hover:scale-110 transition-transform cursor-pointer relative overflow-hidden">

                {/* Fallback Initial */}
                {!follow?.profilePicture && (
                  <span>{follow.name.charAt(0)}</span>
                )}

                {/* Profile Picture */}
                {follow?.profilePicture && (
                  <img
                    src={follow.profilePicture}
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

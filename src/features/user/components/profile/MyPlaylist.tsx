"use client";

import { Link } from "react-router-dom";
import { useUserPlayLists } from "@/core/hooks/useFetchHooks";
import { Music } from "lucide-react";  // default icon

export function MyPlaylists() {

  const { data: playlists, isLoading, isError, error } = useUserPlayLists();

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <p>{error.message}</p>;

  const URL = import.meta.env.VITE_API_URL;

  return (
    <div className="px-8 py-8">
      <h2 className="text-xl font-bold mb-6 text-white">MY PLAYLISTS</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {playlists && playlists.length > 0 ? (
          playlists.map((playlist) => {
            const imageUrl = playlist.coverImageUrl
              ? `${URL}/playList/${playlist.coverImageUrl}`
              : null;

            return (
              <Link to={`/playList/${playlist._id}`} key={playlist._id}>
                <div
                  className="bg-[#181818] rounded-xl p-4 hover:bg-[#232323] transition-colors cursor-pointer group shadow-md"
                >
                  {/* IMAGE WRAPPER */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#2b2b2b] flex items-center justify-center group-hover:scale-105 transition-transform">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="playlist"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-12 h-12 text-gray-400" />
                    )}
                  </div>

                  {/* TITLE */}
                  <p className="font-semibold text-sm mt-3 line-clamp-1 text-white">
                    {playlist.name}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="p-4 text-gray-500">Oops, no playlist found.</p>
        )}
      </div>
    </div>
  );
}

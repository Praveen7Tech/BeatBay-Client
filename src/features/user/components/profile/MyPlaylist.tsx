"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { Link } from "react-router-dom";

export function MyPlaylists() {

  const {data: playlists, isLoading, isError, error} = useQuery({
    queryKey: ["allplayLists"],
    queryFn: ()=> userApi.getUserPlayLits()
  })

  if(isLoading){
    return <h1>Loading....</h1>
  }
  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <div className="px-8 py-8">
      <h2 className="text-xl font-bold mb-6">MY PLAY LISTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists && playlists.length > 0 ? (
         playlists.map((playlist) => (
          <Link to={`/playList/${playlist._id}`}>
          <div
            key={playlist._id}
            className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
          >
            <div className="w-full aspect-square bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
              {"playlist.image"}
            </div>
            <p className="font-semibold text-sm">{playlist.name}</p>
          </div>
          </Link>
        ))
         ) : (
          <p className="p-4 text-gray-500">Oops, no plalist found.</p>
        )}
      </div>
    </div>
  );
}

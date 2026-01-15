"use client";

import {
  useUserPlayLists,
  useUserProfileDetails,
} from "@/core/hooks/api/useFetchHooks";

import { PlaylistCard } from "../../components/playlist/playListCard";
import { Pagination } from "../../components/pagination/pagination";
import { useParams } from "react-router-dom";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useState } from "react";

const Playlists = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [page, setpage] = useState(1);
  const Limit = 2

  const isOtherUser = Boolean(userId);

  /* ---------------- CURRENT USER PLAYLISTS ---------------- */
  const myPlaylistsQuery = useUserPlayLists(page,Limit,{ enabled: !isOtherUser });

  /* ---------------- OTHER USER PROFILE ---------------- */
  const otherUserProfile = useUserProfileDetails(userId!);

  /* ---------------- LOADING & ERROR ---------------- */
  const isLoading = isOtherUser
    ? otherUserProfile.isLoading
    : myPlaylistsQuery.isLoading;

  const isError = isOtherUser
    ? otherUserProfile.isError
    : myPlaylistsQuery.isError;

  const error = isOtherUser
    ? otherUserProfile.error
    : myPlaylistsQuery.error;

  if (isLoading) return <SpinnerCustom />;

  if (isError) {
    return (
      <p className="text-red-500 p-6">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );
  }

  /* ---------------- FINAL DATA SELECTION ---------------- */
  const playlists = isOtherUser
    ? otherUserProfile.data?.playlists ?? []
    : myPlaylistsQuery.data?.playlists ?? [];

  const totalPages = !isOtherUser ? myPlaylistsQuery.data?.totalPages : 1

  /* ---------------- PAGINATION ---------------- */
  const handlePageChange = (newPage: number) => {
    setpage(newPage);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-black p-6 flex flex-col">
      <div className="max-w-7xl mx-auto grow">
        <h1 className="text-white text-3xl font-bold mx-6 my-10">
         Playlists
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                coverImageUrl={playlist.coverImageUrl}
              />
            ))
          ) : (
            <p className="text-gray-400 p-6">No playlists created.</p>
          )}
        </div>
        <div className="mt-auto py-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
        
    </div>
  );
};

export default Playlists;

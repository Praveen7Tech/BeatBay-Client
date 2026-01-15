"use client";

import { useUserFollowers, useUserFollowing, useUserProfileDetails } from "@/core/hooks/api/useFetchHooks";
import { FollowingCard } from "../../components/following/FollowingCard"; 
import { Pagination } from "../../components/pagination/pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { SpinnerCustom } from "@/components/ui/spinner";

const FollowingListing = () => {
  const { type, userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const PAGE_SIZE = 10; 

  const isFollowingView = type === "following";
  const isOtherUserExist = Boolean(userId)

  // CURRENT USER HOOK
  const myFollowing = useUserFollowing(page, PAGE_SIZE);
  const myFollowers = useUserFollowers(page, PAGE_SIZE);

  // OTHER USER PROFILE HOOK
  const otherUserProfile = useUserProfileDetails(userId!)

  // Loading and error
  const isLoading = isOtherUserExist ? otherUserProfile.isLoading : isFollowingView
  ? myFollowing.isLoading : myFollowers.isLoading
  

const isError = isOtherUserExist
    ? otherUserProfile.isError
    : isFollowingView
      ? myFollowing.isError
      : myFollowers.isError;

  const error = isOtherUserExist
    ? otherUserProfile.error
    : isFollowingView
      ? myFollowing.error
      : myFollowers.error;

  if (isLoading) return <SpinnerCustom/>
  
  if (isError) {
    return (
      <div className="min-h-screen bg-black text-red-600 p-8">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

 //////////////////////////

    let list: any[] = [];
    let totalPages = 1;

    if (isOtherUserExist) {
      const data = otherUserProfile.data;

      if (isFollowingView) {
        list = [
          ...(data?.followingArtists ?? []),
          ...(data?.followingUsers ?? []),
        ];
      } else {
        list = data?.followers ?? [];
      }
    } else {
      const activeQuery = isFollowingView ? myFollowing : myFollowers;
      list = activeQuery.data?.docs ?? [];
      totalPages = activeQuery.data?.totalPages ?? 1;
    }

    // PAGINATION
    const handlePageChange = (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
    };


  return (
    <div className="min-h-screen bg-black p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full grow">
        <h1 className="text-white text-3xl font-bold mx-8 my-10 capitalize">
          {type}
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
          {list.length > 0 ? ( 
            list.map((item) => ( 
              <FollowingCard
                key={item.id}
                id={item.id}
                name={item.name}
                profilePicture={item.profilePicture}
                role={item.role}
              />
            ))
          ) : (
            <p className="text-gray-500 p-8">No {type} found.</p>
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

export default FollowingListing;

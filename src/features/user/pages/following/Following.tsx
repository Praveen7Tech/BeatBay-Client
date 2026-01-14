"use client";

import { useUserFollowers, useUserFollowing } from "@/core/hooks/api/useFetchHooks";
import { FollowingCard } from "../../components/following/FollowingCard"; 
import { Pagination } from "../../components/pagination/pagination";
import { useParams, useSearchParams } from "react-router-dom";

const FollowingListing = () => {
  const { type } = useParams<{ type: "following" | "followers" }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const PAGE_SIZE = 10; 

  const isFollowingView = type === "following";

  // Hooks called in the same order every render
  const followingQuery = useUserFollowing(page, PAGE_SIZE);
  const followersQuery = useUserFollowers(page, PAGE_SIZE);

  const activeQuery = isFollowingView ? followingQuery : followersQuery;
  const { data, isLoading, isError, error } = activeQuery;

  const list = data?.docs || []; 

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-red-600 p-8">Error: {error?.message}</div>;
  }

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
                type={item.role === "artist" ? "artist" : "profile"}
              />
            ))
          ) : (
            <p className="text-gray-500 p-8">No {type} found.</p>
          )} 
        </div>
         <div className="mt-auto py-10">
          <Pagination 
            currentPage={page} 
            totalPages={data?.totalPages || 1} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>

    </div>
  );
};

export default FollowingListing;

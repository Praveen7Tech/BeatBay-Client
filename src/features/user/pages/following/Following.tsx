import { useUserFollowing } from "@/core/hooks/api/useFetchHooks";
import { FollowingCard } from "../../components/following/FollowingCard"; 


const Following = () => {
    const { data: followingList, isLoading, isError, error } = useUserFollowing()
  
    if (isLoading) {
      return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;
    }
  
    if (isError) {
      return <div className="min-h-screen bg-black text-red-600 p-8">{error?.message}</div>;
    }
  
  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1a1a] to-spotify-dark p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mx-8 my-10">Following</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
        {followingList && followingList.length > 0 ? ( 
          followingList.map((f) => (
            <FollowingCard
              key={f.id}
              id={f.id}
              name={f.name}
              profilePicture={f.profilePicture}
            />
          ))
          ):
          <p>no following</p>
          } 
        </div>
      </div>
    </div>
  );
};

export default Following;

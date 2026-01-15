import { UserListSection } from "../following/userListSection";
import { useUserFollowers } from "@/core/hooks/api/useFetchHooks";


export function FollowersSection() {
  const page = 1, limit = 6
  const { data, isLoading, isError, error } = useUserFollowers(page,limit)

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8 text-red-500">{error?.message}</p>;
console.log("datu ", data)
  return (
    <UserListSection
      title="FOLLOWERS"
      users={data?.docs ?? []}
      showAllLink="/connections/followers"
    />
  );
}

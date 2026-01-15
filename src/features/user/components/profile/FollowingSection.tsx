import { useUserFollowing } from "@/core/hooks/api/useFetchHooks";
import { UserListSection } from "../following/userListSection"; 

export function FollowingSection() {
  const { data, isLoading, isError, error } = useUserFollowing(1,7);

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8 text-red-500">{error?.message}</p>;

  return (
    <UserListSection
      title="FOLLOWING"
      users={data?.docs ?? []}
      showAllLink="/connections/following"
    />
  );
}

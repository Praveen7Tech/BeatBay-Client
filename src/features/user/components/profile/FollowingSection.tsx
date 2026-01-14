import { useUserFollowing } from "@/core/hooks/api/useFetchHooks";
import { UserListSection } from "../following/userListSection"; 
import { getUserRedirect } from "@/core/utils/follow/get-user-redirect"; 

export function FollowingSection() {
  const { data, isLoading, isError, error } = useUserFollowing(1,7);

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8 text-red-500">{error?.message}</p>;

  return (
    <UserListSection
      title="FOLLOWING"
      users={data?.docs ?? []}
      showAllLink="/connections/following"
      getRedirect={(user) => getUserRedirect(user.role, user.id)}
    />
  );
}

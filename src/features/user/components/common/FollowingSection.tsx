
import { Follow } from "../../services/userApi";
import { FollowingCard } from "../following/FollowingCard"; 

export function FollowingSection({ users }: { users: Follow[] }) {
  return (
    <div className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Following</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {users.map((u) => (
          <FollowingCard key={u.id} {...u} />
        ))}
      </div>
    </div>
  );
}

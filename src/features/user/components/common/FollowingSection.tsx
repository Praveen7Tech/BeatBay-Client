
import { Follow } from "../../services/response.type";
import { FollowingCard } from "../following/FollowingCard"; 

export function FollowingSection({ users }: { users: Follow[] }) {
  const hasUsers = users.length > 0;

  return (
    <div className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Following</h2>
      {hasUsers ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {users.map((u) => (
            <FollowingCard key={u.id} {...u} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-spotify-secondary">
          <p className="text-lg font-medium">Not following anyone yet</p>
        </div>
      )}
    </div>
  );
}


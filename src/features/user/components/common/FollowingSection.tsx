
import { Link } from "react-router-dom";
import { Follow } from "../../services/response.type";
import { FollowingCard } from "../following/FollowingCard"; 

export function FollowingSection({ users,title,showAllLink }: { users: Follow[],title:string,showAllLink:string }) {
  const hasUsers = users.length > 0;

  return (
    <div className="px-8 py-8">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link to={showAllLink}>
          <p className="text-[#00d084] text-sm hover:underline">
            Show All →
          </p>
        </Link>
        </div>
      {hasUsers ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {users.slice(0,5).map((u) => (
            <FollowingCard key={u.id} {...u} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-spotify-secondary">
          <p className="text-lg font-medium">No {title} found!</p>
        </div>
      )}
    </div>
  );
}


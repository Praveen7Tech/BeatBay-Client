"use client";

import { Link } from "react-router-dom";
import { FollowingCard } from "./FollowingCard";

export type UserItem = {
  id: string;
  name: string;
  role: string;
  profilePicture?: string;
};

type Props = {
  title: string;
  users: UserItem[];
  showAllLink: string;
};

export function UserListSection({
  title,
  users,
  showAllLink,
}: Props) {
  
  return (
    <div className="px-8 py-8 border-t border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link to={showAllLink}>
          <p className="text-[#00d084] text-sm hover:underline">
            Show All →
          </p>
        </Link>
      </div>
        {users.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {users.slice(0,5).map((user) => (
            <FollowingCard {...user}/>
          ))}
          </div>  
        ) : (
          <p className="p-4 text-gray-500">Oops, no users found.</p>
        )}
    </div>
  );
}

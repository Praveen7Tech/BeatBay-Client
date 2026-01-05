"use client";

import { Link } from "react-router-dom";

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
  getRedirect: (user: UserItem) => string;
};

export function UserListSection({
  title,
  users,
  showAllLink,
  getRedirect,
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

      <div className="flex gap-6 pb-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Link key={user.id} to={getRedirect(user)}>
              <div className="flex flex-col items-center gap-3 shrink-0">

                <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-300 hover:scale-110 transition-transform cursor-pointer relative overflow-hidden">
                  {!user.profilePicture && (
                    <span>{user.name.charAt(0)}</span>
                  )}

                  {user.profilePicture && (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>

              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 text-gray-500">Oops, no users found.</p>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

interface FollowingCardProps {
  id: string;
  name: string;
  profilePicture?: string;
  role?:string
}

export const FollowingCard = ({ id, name, profilePicture ,role}: FollowingCardProps) => {
  const path = role == "user" ? "profile" : role
  return (
    <Link
      to={`/${path}/${id}`}
      className="group p-4 rounded-md  hover:bg-[#282828] transition-all duration-300 cursor-pointer"
    >
      <div className="relative mb-4">
        <div className="aspect-square rounded-full overflow-hidden bg-[#282828] flex items-center justify-center">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#535353] to-[#282828] flex items-center justify-center">
              <span className="text-4xl text-spotify-secondary font-bold">{name.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-white font-bold text-base truncate mb-1">{name}</h3>
      <p className="text-[#a7a7a7] text-sm">{role}</p>
    </Link>
  );
};

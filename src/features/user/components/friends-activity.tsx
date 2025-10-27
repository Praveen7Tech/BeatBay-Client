"use client"

const friends = [
  { name: "Rohith Krishna", status: "listening", avatar: "👤" },
  { name: "Alwin P.G", status: "listening", avatar: "👤" },
  { name: "Felwin Shaji", status: "listening", avatar: "👤" },
  { name: "Devan", status: "listening", avatar: "👤" },
]

export default function FriendsActivityCard({ index }: { index: number }) {
  const friend = friends[index - 1]

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00d084] to-[#00a060] rounded-full flex items-center justify-center text-lg">
          {friend.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{friend.name}</p>
          <p className="text-xs text-gray-400">🎵 {friend.status}</p>
        </div>
      </div>
      <button className="bg-[#00d084] text-black px-4 py-1 rounded-full text-xs font-bold hover:bg-[#00c070] transition-colors whitespace-nowrap ml-2">
        JOIN +
      </button>
    </div>
  )
}

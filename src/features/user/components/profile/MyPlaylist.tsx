"use client";

export function MyPlaylists() {
  const playlists = [
    { title: "90's A.R Rahman", image: "🎵" },
    { title: "Driving List", image: "🚗" },
    { title: "Chill Songs", image: "😎" },
  ];

  return (
    <div className="px-8 py-8">
      <h2 className="text-xl font-bold mb-6">MY PLAY LISTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist, idx) => (
          <div
            key={idx}
            className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
          >
            <div className="w-full aspect-square bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
              {playlist.image}
            </div>
            <p className="font-semibold text-sm">{playlist.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

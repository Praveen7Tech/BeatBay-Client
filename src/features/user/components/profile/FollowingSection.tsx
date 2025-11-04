"use client";

export function FollowingSection() {
  const artists = [
    { name: "A.R Rahman", role: "Artist" },
    { name: "K.S Chitra", role: "Artist" },
    { name: "M.G Sreekumar", role: "Artist" },
    { name: "Sreya Goshal", role: "Artist" },
    { name: "Anirudh", role: "Artist" },
    { name: "Madhu Balakrishnan", role: "Artist" },
  ];

  return (
    <div className="px-8 py-8 border-t border-[#2a2a2a]">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#00d084]">✓</span>
        <h2 className="text-xl font-bold">FOLLOWING</h2>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {artists.map((artist, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-2xl font-bold text-gray-600 hover:scale-110 transition-transform cursor-pointer">
              {artist.name.charAt(0)}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">{artist.name}</p>
              <p className="text-xs text-gray-400">{artist.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

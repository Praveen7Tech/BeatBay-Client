
import { SongsSection } from "../../components/profile/song-section"
import { AlbumsSection } from "../../components/profile/album-section"
import { FansSection } from "../../components/profile/fans-section"
import { ArtistHeader } from "../../components/profile/ArtistHeader"

const mockSongs = [
  { id: "1", title: "New York", image: "/song-album-art.jpg" },
  { id: "2", title: "Munbe va", image: "/song-album-art.jpg" },
  { id: "3", title: "Kaathalae", image: "/song-album-art.jpg" },
]

const mockAlbums = [
  { id: "1", title: "Varnam Ayram", image: "/abstract-soundscape.png" },
  { id: "2", title: "Best Of A R Rahman", image: "/abstract-soundscape.png" },
]

const mockFans = [
  { id: "1", name: "Rohith Krishna", image: "/fan-avatar.jpg" },
  { id: "2", name: "Felwin Shaji", image: "/fan-avatar.jpg" },
]

const mockArtist = {
  name: "A R Rahman",
  verified: true,
  image: "/diverse-music-artists.png",
  stats: { songs: 567, albums: 45, fans: 3456789 },
}

export default function ProfilePageArtist() {
  return (
    <>
    <ArtistHeader
        name={mockArtist.name}
        verified={mockArtist.verified}
        image={mockArtist.image}
        stats={mockArtist.stats}
      />
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <SongsSection songs={mockSongs} />
        <AlbumsSection albums={mockAlbums} />
      </div>
      <div className="lg:w-80 shrink-0">
        <FansSection fans={mockFans} />
      </div>
    </div>
    </>
  )
}

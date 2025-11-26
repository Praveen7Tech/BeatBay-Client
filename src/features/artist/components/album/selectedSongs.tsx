import { InitialAlbumSongs } from "../../services/artist.api";

interface AlbumSongProps{
    song :InitialAlbumSongs
}

export function SelectedSongs({song}: AlbumSongProps){
    const URL_BASE = import.meta.env.VITE_API_URL;
    const CoverImageURL = `${URL_BASE}/songs/${song.coverImageUrl}` 
    return(
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-4">Selected Tracks</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg"
                  >
                    <img
                      src={CoverImageURL}
                      className="aspect-square object-cover w-full"
                    />
                    <div className="p-3">
                      <p className="text-xs truncate">{song.title}</p>
                    </div>
                  </div>
            </div>
          </div>
    )
}
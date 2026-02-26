
import { Link } from "react-router-dom"
import AlbumCard from "../../components/home/album-card" 
import { useUserAlbums, useUserSongs } from "@/core/hooks/api/useFetchHooks"
import { SpinnerCustom } from "@/components/ui/spinner"
import QuickLinks from "../../components/home/QuivkLinks"
export default function HomeContent() {
 
  const {data: songs, isLoading: songsLoading, isError: songsError, error: songMessage} = useUserSongs()
  const {data: albums, isLoading: albumsLoading, isError: albumsError, error: albumMessage} = useUserAlbums()

    if (songsLoading || albumsLoading) {
        return <SpinnerCustom/>
    }

    if (songsError || albumsError) {
        return <div>Error: {songMessage?.message || albumMessage?.message}</div>;
    }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <QuickLinks/>
        {/* Popular Releases */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Popular Releases</h2>
            <Link 
              to={`/showall?type=songs`} 
              className="text-[#00d084] text-sm hover:underline"
            >
              Show All →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {songs && songs.length > 0 ? (
              songs.map((song) => (
              <Link to={`/song/${song.id}`}>
              <AlbumCard key={song.id} {...song} type="song"/>
              </Link>
            ))
            ):(
              <p className="p-4 text-gray-500">Oops no songs found.</p>
            )  }
            
          </div>
        </div>

        {/* Trending Albums */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Trending Albums</h2>
            <Link 
              to={`/showall?type=albums`} 
              className="text-[#00d084] text-sm hover:underline"
            >
              Show All →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            { albums && albums.length > 0 ? (
              albums.map((album)=>(
              <Link to={`/album/${album.id}`}>  
                <AlbumCard key={album.id} {...album} type="album"/>         
              </Link>  
              ))
            ):(
              <p className="p-4 text-gray-500">Oops no albums found.</p>
            )}           
          </div>
        </div>
      </div>
    </div>
  )
}

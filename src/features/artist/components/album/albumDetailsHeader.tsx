"use client"
import { ArrowLeft,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialogDemo } from "../song/ui/Alert-Dialouge"
import { useDeleteAlbum } from "@/core/hooks/artist/useDeleteAlbum"
import { useAlbumDetails } from "@/core/hooks/artist/useAlbumDetails"
import { SpinnerCustom } from "@/components/ui/spinner"


export function AlbumDetailsHeader() {

  const {album, isLoading, albumId, isError, CoverImageURL} = useAlbumDetails()
  const {deleteSongMutation} = useDeleteAlbum()

  if (isLoading ) {
    return <SpinnerCustom/>
  }

  if (isError || !album) { 
    return <div>Error loading album details.</div>;
  }

  const HandleDelete = () => {
    if (albumId) {
        deleteSongMutation(albumId); 
    }
  };
  return (
    <>
    <Button onClick={()=> window.history.back()} variant="ghost" className="mb-6 -ml-2">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Albums
    </Button>
    <div className="flex items-start gap-6 mb-8 bg-surface p-6 rounded-lg border border-border">
      <div className="flex gap-6 flex-1 flex-col md:flex-row md:items-end">
        {/* Album Art */}
        <div className="relative">
          <img
            src={CoverImageURL || "/placeholder.svg"}
            alt={album.title}
            className="w-48 h-48 rounded-lg shadow-lg object-cover"
          />
         
        </div>

        {/* Album Info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Album</p>
            <h1 className="text-4xl font-bold text-foreground">{album.title}</h1>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {album.songs.length} tracks
            </span>
            {/* <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {"albumData.genre"}
            </span> */}
            {/* <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {"albumData.plays"} plays
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              Released: {new Date("albumData.releaseDate").toLocaleDateString()}
            </span> */}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:flex-col">
         <AlertDialogDemo onConfirm={HandleDelete}/>
        </div>
      </div>
    </div>
    </>
  )
}

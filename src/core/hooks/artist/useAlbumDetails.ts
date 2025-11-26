import { artistApi, EditAlbumDetailsResponse } from "@/features/artist/services/artist.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useAlbumDetails = () =>{
    const { albumId } = useParams();
    console.log("iduu", albumId)
    const URL_BASE = import.meta.env.VITE_API_URL;

    // Use query hook to fetch the data
      const {data: album, isLoading, isError, error} = useQuery<EditAlbumDetailsResponse>({
        queryKey: ["albumDetailsById", albumId],
        queryFn: ()=> artistApi.getAlbumById(albumId!)
    })

    const CoverImageURL = album?.coverImageUrl ? `${URL_BASE}/albums/${album.coverImageUrl}` : undefined;

    return {
        album,
        songs: album?.songs,
        isLoading,
        isError,
        error,
        CoverImageURL,
        albumId,
    };
}
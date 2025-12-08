import { artistApi, EditAlbumDetailsResponse } from "@/features/artist/services/artist.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useAlbumDetails = () =>{
    const { albumId } = useParams();

    // Use query hook to fetch the data
      const {data: album, isLoading, isError, error} = useQuery<EditAlbumDetailsResponse>({
        queryKey: ["albumDetailsById", albumId],
        queryFn: ()=> artistApi.getAlbumById(albumId!)
    })

    return {
        album,
        songs: album?.songs,
        isLoading,
        isError,
        error,
        CoverImageURL: album?.coverImageUrl,
        albumId,
    };
}
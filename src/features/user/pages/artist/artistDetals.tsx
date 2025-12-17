import { useParams } from "react-router-dom";
import { ProfilePageLayout } from "../../components/common/ProfileLayout"; 
import { ProfileHeader } from "../../components/common/ProfileHeader"; 
import { SongsSection } from "../../components/common/SongSection"; 
import { AlbumsSection } from "../../components/common/AlbumSection"; 
import { SpinnerCustom } from "@/components/ui/spinner";
import { useArtistDetails } from "@/core/hooks/api/useFetchHooks";

export default function ArtistDetail() {
  const { artistId } = useParams();
  const { data,isLoading, isError, error, isFetching,} = useArtistDetails(artistId!)

  if (isLoading) {
    return (
        <SpinnerCustom />
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Failed to load artist"}
      </div>
    );
  }
  const artist = data;

  return (
    <ProfilePageLayout>
      <ProfileHeader
        id={artist._id}
        name={artist.name}
        profilePicture={artist.profilePicture}
        role="artist"
        verified
        subtitle={`monthly listeners`}
      />

      <SongsSection songs={artist.songs} />
      <AlbumsSection albums={artist.albums} isFetching={isFetching} />
    </ProfilePageLayout>
  );
}


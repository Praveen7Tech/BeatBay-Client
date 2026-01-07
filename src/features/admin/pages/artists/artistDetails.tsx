"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useArtistManagement } from "@/core/hooks/admin/useArtistManagement"
import { ArtistSongsList } from "../../components/artists/artist-SongGrid"
import { ArtistAlbumsGrid } from "../../components/artists/artist-AlbumGrid"
import ProfileHeaderCard from "../../components/common/ProfileHeaderCard"
import AccountInfoCard from "../../components/common/AccountInformationCard"
import StatisticsCard from "../../components/common/StatisticsCard"
import BlockStatusCard from "../../components/common/BlockUnblockCard"

export function ArtistDetails() {
  const {artistId} = useParams()
  const {artist, isLoading, HanleTooglrBlock, fetchLoading, isError}= 
  useArtistManagement(artistId!)

  if(fetchLoading) return <div>Loading..</div>
  if(isError) return <div>Loading..</div>
  const handleToggleBlock =() => {
    HanleTooglrBlock()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/artists">
          <Button variant="ghost" size="icon" className="text-spotify-secondary hover:text-spotify-text">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-spotify-text">Artist Details</h1>
          <p className="text-spotify-secondary">Manage artist account and content moderation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Artist Profile Card */}
          <ProfileHeaderCard
              name={artist?.name}
              bio={artist?.bio}
              profileImage={artist?.profilePicture}
              status={artist?.status}
              isArtist={true}
          />

          {/* Account Information card*/}
          <AccountInfoCard
            email={artist?.email}
            createdAt={artist?.createdAt}
            showId={false}
          />
          {/* Statistics */}
          <StatisticsCard type="artist" data={artist!} />
          {/* Top Songs */}
          {/* <TopSongsCard/> */}
          
          {/* album listing card */}
          <ArtistAlbumsGrid albums={artist?.albums || []} itemsPerPage={3} />
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Block/Unblock Card */}
          <BlockStatusCard
            type="artist"
            status={artist?.status}
            isLoading={isLoading}
            onToggle={handleToggleBlock}
          />
           {/* Song listing card */}
          <ArtistSongsList songs={artist?.songs || []} itemsPerPage={5} />
          {/* <FansList  itemsPerPage={5} /> */}
         
        </div>
      </div>
    </div>
  )
}
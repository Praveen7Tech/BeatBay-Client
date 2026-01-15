import { useState } from "react";
import { Home, Search, Plus, Heart, ChevronLeft, ChevronRight, Play, Music, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useUserFollowing, useUserPlayLists } from "@/core/hooks/api/useFetchHooks";
import { useCreatePlayList } from "@/core/hooks/playList/usePlayList";
import { SidebarShimmer } from "@/core/components/shimmers/SidebarShimmer";
import { FollowingResponse } from "../../services/response.type";

const mainItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Browse", url: "/browse", icon: Search },
  // { title: "Your Library", url: "/library", icon: Library },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // fetch playlist and folowerss
  const {data: playlistsData, isLoading, isError, error} = useUserPlayLists()
  const { data: followers, isLoading: follow, isError:followError, } = useUserFollowing(1, 6)
  // create PlayList hook
  const createPlayList = useCreatePlayList()
  const HandleCreatePlayList = ()=>{
    createPlayList.mutate()
  }

  if(isLoading || follow){
    return <SidebarShimmer/>
  }
  if(isError || followError){
    return <p>{error?.message }</p>
  }

  const playlists = playlistsData?.playlists
  const artists = followers?.docs.filter((f:FollowingResponse)=> f.role === "artist")

  return (
    <aside
      className={`${
        isOpen ? "w-75" : "w-25" }
        bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col relative `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent transition-colors"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {mainItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className="flex items-center gap-4 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            activeClassName="bg-sidebar-accent text-white font-semibold"
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Library */}
      <div className="px-4 space-y-3 overflow-hidden">

         {/* Liked Songs */}
        <NavLink
          to="/liked-songs"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors"
          activeClassName="bg-sidebar-accent text-white"
        >
          <div className="h-10 w-10 rounded bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
          {isOpen && <span className="text-sm">Liked Songs</span>}
        </NavLink>

        {/* Create Playlist */}
        <div
        onClick={HandleCreatePlayList}
          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <div className="h-8 w-8 rounded-sm bg-sidebar-accent flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
          {isOpen && <span className="text-sm text-sidebar-foreground">Create Playlist</span>}
        </div>

       
        {/* Scrollable Playlists */}
        {playlists?.length! > 0 && (
        <div className="overflow-y-auto max-h-[25vh] pr-2 space-y-1 scrollbar-hide">
          {playlists?.map((p) => (
            <NavLink
              key={p.id}
              to={`/playlist/${p.id}`}
              className="group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-white"
            >
              <div className="relative h-10 w-10 rounded overflow-hidden bg-sidebar-accent flex items-center justify-center">
                {p.coverImageUrl ? (
                  <img
                    src={p.coverImageUrl}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Music className="h-5 w-5 text-white opacity-70" />
                )}

                {/* Hover Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
              </div>
              {isOpen && <span className="text-sm text-sidebar-foreground truncate">{p.name}</span>}
            </NavLink>
          ))}
        </div>
        )}

        {/* Artists */}
        {isOpen && <h3 className="text-xs font-semibold text-sidebar-foreground mt-3 px-3">Artists</h3>}
        {artists?.length! > 0 && (
        <div className="overflow-y-auto h-[25vh] pr-2 space-y-1">
          {artists?.map((artist) => (
            <NavLink
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-white"
            >
             <div className="relative h-10 w-10 rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center">
              {artist.profilePicture && artist.profilePicture !== null ? (
                <img
                  src={artist.profilePicture}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-white opacity-70" />
              )}

              {/* Hover Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
            </div>
              {isOpen && <span className="text-sm text-sidebar-foreground">{artist.name}</span>}
            </NavLink>
          ))}
        </div>
        )}
      </div>

      {/* Fade Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-linear-to-t from-black to-transparent" />
    </aside>
  );
}

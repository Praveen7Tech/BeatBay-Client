import { Upload, Plus, Trash2 } from "lucide-react";
import { Input } from "@/core/components/input/Input";
import { Button } from "@/core/components/button/Button";
import { useCreateAlbum } from "@/core/hooks/artist/useCreateAlbum";
import { useParams } from "react-router-dom";

export default function CreateAlbumRaw() {
  const {albumId} = useParams()
  const isEdit = Boolean(albumId)
  const {
    previewUrl,
    showSongSearch,
    setShowSongSearch,
    searchValue,
    setSearchValue,
    register,
    handleSubmit,
    errors,
    filteredSongs,
    handleAddSong,
    handleRemoveSong,
    handleImageUpload,
    HandleUpload,
    selectedSongs,
    songs, isLoading
  } = useCreateAlbum(isEdit);


  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {isEdit ? "Edit Album" : "Create Album"}
      </h1>

      <form onSubmit={handleSubmit(HandleUpload)}>
        <input type="hidden" {...register("songIds")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-4">Title Card</label>

            <input type="file" id="cover" className="hidden" onChange={handleImageUpload} />

            <label
              htmlFor="cover"
              className="block w-48 h-48 bg-zinc-900 border border-zinc-700 rounded-lg cursor-pointer overflow-hidden"
            >
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600">
                  <Upload size={40} />
                </div>
              )}
            </label>

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Inputs */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Title</label>
              <Input {...register("title")} theme="artist" placeholder="Album Title" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <Input {...register("description")} theme="artist" placeholder="Description" />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Add Track */}
            <div>
              <label className="block mb-3">Add Track</label>
              <div
                onClick={() => setShowSongSearch(!showSongSearch)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer hover:border-green-500 transition flex items-center justify-between"
                >
                  <span className="text-zinc-400 text-sm">Songs - {selectedSongs.length}</span>
                  <Plus size={20} className="text-zinc-600" />
              </div>

              {errors.songIds && (
                <p className="text-red-500 text-sm mt-1">{errors.songIds.message}</p>
              )}

              {showSongSearch && (
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg mt-2 max-h-56 overflow-y-auto">
                  {filteredSongs.map(
                    (song) =>
                      !selectedSongs.includes(song.id) && (
                        <button
                          key={song.id}
                          type="button"
                          onClick={() => handleAddSong(song.id)}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800"
                        >
                          {song.title}
                        </button>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Search */}
            <div>
              <label className="block mb-2">Search Track</label>
              <Input
                theme="artist"
                placeholder="Search track"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Selected Songs */}
        {selectedSongs.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-4">Selected Tracks</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {songs
                ?.filter((s) => selectedSongs.includes(s.id))
                .map((song) => (
                  <div
                    key={song.id}
                    className="relative bg-zinc-900 border border-zinc-700 rounded-lg"
                  >
                    <img
                      src={song.coverImageUrl}
                      className="aspect-square object-cover w-full"
                    />
                    <div className="p-3">
                      <p className="text-xs truncate">{song.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSong(song.id)}
                      className="absolute top-2 right-2 bg-red-600 p-2 rounded-full"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-8">
          <Button theme="artist" type="button" onClick={() => window.history.back()}>
            CANCEL
          </Button>
          <Button theme="artist" type="submit" loading={isLoading}>
            {isEdit ? "EDIT" : "CREATE"}
          </Button>
        </div>
      </form>
    </div>
  );
}

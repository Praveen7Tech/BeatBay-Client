
"use client";

import { Music, FileText, Upload } from "lucide-react";
import { artistApi } from "../../services/artist.api"; 
import { useSongUpload } from "@/core/hooks/artist/useSongUpload";

export default function UploadTrack() {
  
  const {register, handleSubmit, errors, fileInputRef, trackInputRef, lrcInputRef, coverPreview, trackFileName, lrcFileName, handleFileChange, Onsubmit} = useSongUpload(artistApi.uploadSong)


  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Upload New Track</h1>

        <form onSubmit={handleSubmit(Onsubmit)} className="flex gap-12">
          {/* Cover Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="coverUpload" className="cursor-pointer">
              <div
                className="w-48 h-48 rounded-lg bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center border-2 border-gray-600 hover:border-green-500 transition-colors overflow-hidden"
                style={{
                  backgroundImage: coverPreview ? `url(${coverPreview})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!coverPreview && (
                  <div className="text-center">
                    <div className="text-4xl text-gray-400 mb-2">♪</div>
                    <span className="text-gray-400 text-sm">Add Cover</span>
                  </div>
                )}
              </div>
            </label>
            <input
              ref={fileInputRef}
              id="coverUpload"
              type="file"
              accept="image/*"
              onChange={(e)=> handleFileChange("coverImage", e.target.files)}
              className="hidden"
            />
             {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>}
            <p className="text-gray-400 text-sm">Cover Image</p>
          </div>

          {/* Form Fields */}
          <div className="flex-1">
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Track File</label>
              <div
                onClick={() => trackInputRef.current?.click()}
                className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700 hover:border-green-500 transition-colors cursor-pointer flex items-center gap-3"
              >
                <Music size={18} className="text-green-500" />
                <span className="truncate">{trackFileName || "Select audio file (MP3, WAV, FLAC)"}</span>
              </div>
              <input ref={trackInputRef} type="file" accept="audio/*"
               onChange={(e)=> handleFileChange("trackFile", e.target.files)} className="hidden" />
               {errors.trackFile && <p className="text-red-500 text-xs mt-1">{errors.trackFile.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Title</label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="Title"
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <input
                  {...register('description')}
                  type="text"
                  placeholder="Description"
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
            </div>

            {/* Lyrics */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Lyrics</label>
              <textarea
                {...register('lyrics')}
                placeholder="Lyrics"
                rows={5}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors resize-none"
              />
              {errors.lyrics && <p className="text-red-500 text-xs mt-1">{errors.lyrics.message}</p>}
            </div>

            {/* Synced Lyrics (LRC) */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Synced Lyrics (LRC)</label>
              <div
                onClick={() => lrcInputRef.current?.click()}
                className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700 hover:border-green-500 transition-colors cursor-pointer flex items-center gap-3"
              >
                <FileText size={18} className="text-green-500" />
                <span className="truncate">{lrcFileName || "Select .lrc file (optional)"}</span>
              </div>
              <input ref={lrcInputRef} type="file" accept=".txt" 
              onChange={(e)=> handleFileChange("lrcFile", e.target.files)} className="hidden" />
              <p className="text-gray-500 text-xs mt-2">LRC format enables time-synced lyrics on streaming platforms</p>
              {errors.lrcFile && <p className="text-red-500 text-xs mt-1">{errors.lrcFile.message}</p>}
            </div>

            {/* Album & Genre */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Album</label>
                <div className="flex gap-2">
                  <select
                    {...register('album')}
                    className="flex-1 px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Album</option>
                    <option value="album1">Album 1</option>
                    <option value="album2">Album 2</option>
                  </select>
                  <button
                    type="button"
                    className="px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700 hover:border-green-500 transition-colors"
                  >
                    +
                  </button>
                  {errors.album && <p className="text-red-500 text-xs mt-1">{errors.album.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Genre</label>
                <select
                  {...register('genre')}
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="">Genre</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="pop">Pop</option>
                  <option value="electronic">Electronic</option>
                  <option value="rock">Rock</option>
                </select>
                {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre.message}</p>}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Tags (comma separated)</label>
              <input
                {...register('tags')}
                type="text"
                placeholder="Tags, comma, separated"
                className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
              />
              {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Release Date</label>
                <input
                  {...register('releaseDate')} // Corrected name to 'releaseDate'
                  type="date"
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
                {errors.releaseDate && <p className="text-red-500 text-xs mt-1">{errors.releaseDate.message}</p>}
              </div>

              {/* <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register('isExplicit')} // Register the checkbox
                    type="checkbox"
                    className="w-4 h-4 accent-green-500"
                  />
                  <span className="text-gray-400 text-sm">Mark as Explicit</span>
                </label>
              </div> */}
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Upload size={18} />
                UPLOAD
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}


"use client";

import { Music, FileText} from "lucide-react";
import { artistApi } from "../../services/artist.api"; 
import { useSongUpload } from "@/core/hooks/artist/useSongUpload";
import { Input } from "@/core/components/input/Input";
import { Button } from "@/core/components/button/Button";

export default function UploadTrack() {
  
  const {register, handleSubmit, errors, fileInputRef, trackInputRef, lrcInputRef, coverPreview, trackFileName, lrcFileName, handleFileChange, Onsubmit} = useSongUpload(artistApi.uploadSong)


  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Upload New Track</h1>

        <form onSubmit={handleSubmit(Onsubmit)} className="flex gap-12">
          {/* Cover Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="coverUpload" className="cursor-pointer">
              <div
                className="w-48 h-48 rounded-lg flex items-center justify-center border-2 border-gray-600 hover:border-green-500 transition-colors overflow-hidden"
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
            <Input 
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
            <h2 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  Track Details
            </h2>
          
            <div className="grid gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Title</label>
                <Input theme="artist"
                  {...register('title')}
                  type="text"
                  placeholder="Title" error={errors.title?.message} errorTheme="red"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <Input theme="artist"
                  {...register('description')}
                  type="text"
                  placeholder="Description" error={errors.description?.message} errorTheme="red"
                />
              </div>
            </div>

            {/* Album & Genre */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Album</label>
                <div className="flex gap-2">
                  <select
                    {...register('album')}
                    className="flex-1 px-4 py-3 rounded-sm bg-black text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Album</option>
                    <option value="album1">Album 1</option>
                    <option value="album2">Album 2</option>
                  </select>
                  
                  {errors.album && <p className="text-red-500 text-xs mt-1">{errors.album.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Genre</label>
                <select
                  {...register('genre')}
                  className="w-full px-4 py-3 rounded-sm bg-black text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
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
              <Input theme="artist"
                {...register('tags')}
                type="text"
                placeholder="Tags, comma, separated"
              />
              {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
            </div>

             {/* Track file and Lyrics (LRC) */}
            <div className="grid gap-6 mb-6">
               <h2 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Audio Files
                </h2>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Track File</label>
              <div
                onClick={() => trackInputRef.current?.click()}
                className="w-full px-4 py-3  text-white border border-gray-700 hover:border-green-500 transition-colors cursor-pointer flex items-center gap-3 rounded-sm"
              >
                <Music size={18} className="text-green-500" />
                <span className="truncate">{trackFileName || "Select audio file (MP3, WAV, FLAC)"}</span>
              </div>
              <Input ref={trackInputRef} type="file" accept="audio/*"
               onChange={(e)=> handleFileChange("trackFile", e.target.files)} className="hidden" placeholder="" theme="artist"/>
               {errors.trackFile && <p className="text-red-500 text-xs mt-1">{errors.trackFile.message}</p>}
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Synced Lyrics (LRC)</label>
              <div
                onClick={() => lrcInputRef.current?.click()}
                className="w-full px-4 py-3 rounded-sm text-white border border-gray-700 hover:border-green-500 transition-colors cursor-pointer flex items-center gap-3"
              >
                <FileText size={18} className="text-green-500" />
                <span className="truncate">{lrcFileName || "Select .lrc file"}</span>
              </div>
              <Input ref={lrcInputRef} type="file" accept=".txt" 
              onChange={(e)=> handleFileChange("lrcFile", e.target.files)} className="hidden" />
              <p className="text-gray-500 text-xs mt-2">LRC format enables time-synced lyrics on streaming platforms</p>
              {errors.lrcFile && <p className="text-red-500 text-xs mt-1">{errors.lrcFile.message}</p>}
              </div>
              
            </div>

            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Release Date</label>
                <Input theme="artist"
                  {...register('releaseDate')} // Corrected name to 'releaseDate'
                  type="date" placeholder=""
                />
                {errors.releaseDate && <p className="text-red-500 text-xs mt-1">{errors.releaseDate.message}</p>}
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center gap-6 mt-10">
              {/* Cancel Button */}
              <Button theme="artist"
                type="button"
                className="px-8 py-3 rounded-full border-2 border-gray-500 text-gray-300 font-semibold hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => window.history.back()}
              >
                CANCEL
              </Button>

              {/* Upload Button */}
              <Button theme="artist" type="submit" >
                {/* <Upload size={18} /> */}
                UPLOAD
              </Button>
            </div>
          </div>
          
        </form>
      </div>
    </main>
  )
}

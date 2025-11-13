"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Upload, Music, FileText } from "lucide-react"

interface TrackFormData {
  title: string
  description: string
  lyrics: string
  album: string
  genre: string
  tags: string
  coverImage: File | null
  trackFile: File | null
  lrcFile: File | null
  releaseDate: string
  isExplicit: boolean
}

export default function UploadTrack() {
  const [formData, setFormData] = useState<TrackFormData>({
    title: "",
    description: "",
    lyrics: "",
    album: "",
    genre: "",
    tags: "",
    coverImage: null,
    trackFile: null,
    lrcFile: null,
    releaseDate: "",
    isExplicit: false,
  })
  const [coverPreview, setCoverPreview] = useState<string>("")
  const [trackFileName, setTrackFileName] = useState<string>("")
  const [lrcFileName, setLrcFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const trackInputRef = useRef<HTMLInputElement>(null)
  const lrcInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }))
      const reader = new FileReader()
      reader.onloadend = () => setCoverPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleTrackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, trackFile: file }))
      setTrackFileName(file.name)
    }
  }

  const handleLrcUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.name.endsWith(".txt")) {
      setFormData((prev) => ({ ...prev, lrcFile: file }))
      setLrcFileName(file.name)
    } else {
      alert("Please select a valid .lrc file")
    } 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Track upload submitted:", formData)
    // Add API call here
  }

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Upload New Track</h1>

        <form onSubmit={handleSubmit} className="flex gap-12">
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
              onChange={handleImageUpload}
              className="hidden"
            />
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
              <input ref={trackInputRef} type="file" accept="audio/*" onChange={handleTrackUpload} className="hidden" />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Lyrics */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Lyrics</label>
              <textarea
                name="lyrics"
                value={formData.lyrics}
                onChange={handleInputChange}
                placeholder="Lyrics"
                rows={5}
                className="w-full px-4 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors resize-none"
              />
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
              <input ref={lrcInputRef} type="file" accept=".txt" onChange={handleLrcUpload} className="hidden" />
              <p className="text-gray-500 text-xs mt-2">LRC format enables time-synced lyrics on streaming platforms</p>
            </div>

            {/* Album & Genre */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Album</label>
                <div className="flex gap-2">
                  <select
                    name="album"
                    value={formData.album}
                    onChange={handleInputChange}
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
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Genre</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="">Genre</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="pop">Pop</option>
                  <option value="electronic">Electronic</option>
                  <option value="rock">Rock</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Tags"
                className="w-full px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isExplicit"
                    checked={formData.isExplicit}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-green-500"
                  />
                  <span className="text-gray-400 text-sm">Mark as Explicit</span>
                </label>
              </div>
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

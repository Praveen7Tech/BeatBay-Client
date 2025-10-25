"use client"

import { Sidebar } from "../components/sidebar" 
import { RightSidebar } from "../components/right-sidebar" 
import { Header } from "../components/header" 
import { FeaturedArtist } from "../components/featured-artist" 
import { AlbumSection } from "../components/album-section" 
import { MusicPlayer } from "../components/music-player" 

const popularReleases = [
  {
    id: "1",
    title: "New York",
    artist: "A R Rahman",
    image: "/album-new-york.jpg",
  },
  {
    id: "2",
    title: "Munbe va",
    artist: "Shreya Ghoshal",
    image: "/album-munbe-va.jpg",
  },
  {
    id: "3",
    title: "Kaathalae",
    artist: "Govind Vasantha",
    image: "/album-kaathalae.jpg",
  },
  {
    id: "4",
    title: "Oru Kathilola",
    artist: "M G Sreekumar",
    image: "/album-oru-kathilola.jpg",
  },
  {
    id: "5",
    title: "Pottukuthedi",
    artist: "Vasundhra Das",
    image: "/album-pottukuthedi.jpg",
  },
  {
    id: "6",
    title: "Ranam Title - Track",
    artist: "Ajay Shravan",
    image: "/album-ranam.jpg",
  },
]

const trendingAlbums = [
  {
    id: "1",
    title: "Best Of Anirudh",
    artist: "Anirudh",
    image: "/album-anirudh.jpg",
  },
  {
    id: "2",
    title: "Varanam Ayiram",
    artist: "A R Rahman",
    image: "/album-varanam.jpg",
  },
  {
    id: "3",
    title: "Vettam - Hits",
    artist: "M G Sreekumar",
    image: "/album-vettam.jpg",
  },
  {
    id: "4",
    title: "Meesha Madhvan",
    artist: "Sugatha Mohanan",
    image: "/album-meesha.jpg",
  },
  {
    id: "5",
    title: "Mohan Lal - Hits",
    artist: "East Cost",
    image: "/album-mohan-lal.jpg",
  },
  {
    id: "6",
    title: "Ranam Title - Track",
    artist: "Ajay Shravan",
    image: "/album-ranam-trending.jpg",
  },
]

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar activeTab="home" />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-auto pt-24 pb-32">
          <div className="flex gap-8 px-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="flex-1">
              <FeaturedArtist
                name="A R Rahman"
                verified
                listeners={67856}
                image="/artist-ar-rahman-with-headphones.jpg"
              />

              <AlbumSection title="Popular Releases" albums={popularReleases} />
              <AlbumSection title="Trending Albums" albums={trendingAlbums} />
            </div>

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </main>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}

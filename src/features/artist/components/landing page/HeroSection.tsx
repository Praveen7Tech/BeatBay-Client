"use client"

import type React from "react"
import { useState } from "react"
import { FeatureCard } from "./FeatureCards" 

interface HeroSectionProps {
  backgroundVideo?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundVideo = "https://videos.pexels.com/video-files/7945669/7945669-hd_1280_720_25fps.mp4",
}) => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0)

  const features = [
    { title: "Amplify your music", description: "Reach millions of listeners with advanced distribution" },
    { title: "Connect with fans", description: "Build lasting relationships with your audience" },
    { title: "Grow your business", description: "Monetize your music with multiple revenue streams" },
    { title: "Understand audience", description: "Deep analytics to optimize your strategy" },
  ]

  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      {/* Background Video */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-32 pb-8 px-6">
        {/* Main Heading */}
        <div className="w-[90%] mx-auto ">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where your music <br />
            <span className="text-green-500">is everything</span>
          </h1>
          <p className="text-white/70 max-w-2xl mb-8 text-lg">
            Develop your fanbase, build your business, and create the world around your music.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <button key={idx} onClick={() => setSelectedFeature(idx)} className="text-left">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  isActive={selectedFeature === idx}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

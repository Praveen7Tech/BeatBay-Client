import { Navbar } from "../../components/landing page/Navbar" 
import { HeroSection } from "../../components/landing page/HeroSection" 
import { FeatureShowcase } from "../../components/landing page/FeatureShowcase" 

function LandingPage() {
  const handleNavigation = () => {
    //console.log("Navigating to:", page)
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar onNavigate={handleNavigation} />

      <HeroSection />

      {/* Amplify Your Music */}
      <FeatureShowcase
        title="Amplify your music"
        description="Turn up your music with Campaign Kit — a set of tools designed to drive meaningful metrics for artists and music marketers."
        features={[
          "Marquee makes your new release unmissable with a full-screen recommendation",
          "Showcase promotes your music on Home with a selected headline",
          "Discovery Mode can give your music a boost in personalized playlists",
          "Share your upcoming tracks with Spotify editors using playlist pitching",
        ]}
        buttonText="Explore Campaign Kit"
        accentColor="green"
      />

      {/* Grow Your Business */}
      <FeatureShowcase
        title="Grow your business"
        description="There are many ways to earn revenue as an artist on Spotify. While Loud & Clear is your source for data, resources, and transparency around streaming royalties, here are some other opportunities to explore."
        features={[
          "Sell and promote merch on Spotify, because music and merch are better together",
          "List your concert and festival dates to make sure your fans never miss another show",
          "Fan Support lets you collect tips, or rally listeners around a charitable cause",
        ]}
        buttonText="Explore Merch, Live, & More"
        accentColor="cyan"
      />

      {/* Connect With Fans */}
      <FeatureShowcase
        title="Connect with fans"
        description="Invite listeners into your creative world. Customize your artist profile, create videos & visuals, and bring the story behind your music to life."
        features={[
          "Clips are short videos you create to connect with fans while keeping your music front-and-center",
          "Add a Canvas — a short, looping visual – to each of your tracks on Spotify",
          "Countdown Pages help you get fans hyped for your upcoming album",
          "Your artist profile shows fans what you're all about",
        ]}
        buttonText="Explore Video & Visuals"
        accentColor="cyan"
      />

      {/* Understand Your Audience */}
      <FeatureShowcase
        title="Understand your audience"
        description="Dig into audience, playlist, and music data to help you reach your goals."
        features={[
          "Segments allow you to better understand the breakdown of your audience",
          "Hone your marketing strategy with release engagement and listener conversion metrics",
          "Fan Study is our ongoing report about fan behavior around the world",
        ]}
        buttonText="Explore analytics"
        accentColor="blue"
      />

      <div className="bg-black py-12 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">© 2025 SoundFlow. All rights reserved.</p>
      </div>
    </div>
  )
}

export default LandingPage

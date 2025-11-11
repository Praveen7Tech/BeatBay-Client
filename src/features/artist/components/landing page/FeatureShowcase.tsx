import type React from "react"

interface FeatureShowcaseProps {
  title: string
  description: string
  features: string[]
  buttonText?: string
  imagePlaceholder?: string
  accentColor?: "green" | "cyan" | "blue"
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  description,
  features,
  buttonText = "Learn more",
  imagePlaceholder = "🎵",
  accentColor = "green",
}) => {
  const accentColorMap = {
    green: "from-green-500/20 to-green-500/5 border-green-500/30",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  }

  return (
    <section className="py-20 px-6 bg-black">
      <div className="w-[90%] mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">{title}</h2>
          <p className="text-white/60 mb-8 text-lg">{description}</p>

          {/* Feature List */}
          <div className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-green-500 text-2xl leading-none">✓</span>
                <p className="text-white/80 text-sm">{feature}</p>
              </div>
            ))}
          </div>

          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300">
            {buttonText}
          </button>
        </div>

        {/* Right Visual Area with Neon Accent */}
        <div
          className={`h-96 bg-linear-to-br ${accentColorMap[accentColor]} rounded-lg border flex items-center justify-center relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at center, currentColor 0%, transparent 70%)",
            }}
          />
          <div className="text-center relative z-10">
            <div
              className={`w-16 h-16 bg-linear-to-br from-${accentColor}-500/30 to-${accentColor}-500/10 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <span className="text-3xl">{imagePlaceholder}</span>
            </div>
            <p className="text-white/50 text-sm">Visual showcase</p>
          </div>
        </div>
      </div>
    </section>
  )
}

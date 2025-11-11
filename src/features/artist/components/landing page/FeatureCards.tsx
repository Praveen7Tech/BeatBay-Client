import type React from "react"

interface FeatureCardProps {
  title: string
  description: string
  isActive?: boolean
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, isActive }) => {
  return (
    <div
      className={`px-6 py-8 rounded-lg border transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-green-500/10 border-green-500/50 scale-105"
          : "bg-white/5 border-white/10 hover:border-green-500/30 hover:bg-white/10"
      }`}
    >
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

"use client"

interface Fan {
  id: string
  name: string
  image: string
}

interface FansSectionProps {
  fans: Fan[]
}

export function FansSection({ fans }: FansSectionProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">Fans</h2>
        <div className="space-y-4">
          {fans.map((fan) => (
            <div
              key={fan.id}
              className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img src={fan.image || "/placeholder.svg"} alt={fan.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white font-medium">{fan.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

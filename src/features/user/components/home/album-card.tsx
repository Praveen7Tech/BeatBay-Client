"use client"

type CardType = 'song' | 'album';
interface SongCardProps {
  title: string;
  coverImageUrl: string;
  type?: CardType;
}


export default function AlbumCard({title, coverImageUrl }: SongCardProps) {
  
  return (
    <div className="shrink-0 w-42 group cursor-pointer">
      <div className={`bg-linear-to-br rounded-lg overflow-hidden mb-3 aspect-square relative`}>
        <img
          src={coverImageUrl}
          
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="font-bold text-sm truncate group-hover:text-[#00d084] transition-colors">{title}</h3>
    </div>
  )
}

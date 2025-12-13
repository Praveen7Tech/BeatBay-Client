"use client"

type CardType = 'song' | 'album';
interface SongCardProps {
  _id?: string;
  title: string;
  album?: string;
  coverImageUrl: string;
  type?: CardType;
}


export default function AlbumCard({title, album, coverImageUrl }: SongCardProps) {
  
  return (
    <div className="shrink-0 w-40 group cursor-pointer">
      <div className={`bg-linear-to-br rounded-lg overflow-hidden mb-3 aspect-square relative`}>
        <img
          src={coverImageUrl}
          
          alt={"image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="font-bold text-sm truncate group-hover:text-[#00d084] transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 truncate">{album}</p>
    </div>
  )
}

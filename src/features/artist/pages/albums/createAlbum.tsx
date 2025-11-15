import { useState } from 'react';
import { Upload, X, Plus, Trash2, Music } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { artistApi } from '../../services/artist.api';
import { Input } from '@/core/components/input/Input';
import { Button } from '@/core/components/button/Button';
import { useForm } from 'react-hook-form';
import { CreateAlbumData, CreateAlbumSchema } from '../../schema-validator/createAlbum.Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/core/hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function CreateAlbumRaw() {

  const Navigate = useNavigate()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("")

  const {register, handleSubmit,setValue,  formState:{errors}} = useForm<CreateAlbumData>({
        resolver: zodResolver(CreateAlbumSchema)
  }) 
  const {execute : CreateAlbum} = useApi(artistApi.createAlbum)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      setPreviewUrl(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    } else {
      setPreviewUrl('');
    }
  };

  const handleAddSong = (id: string) => {
    setSelectedSongs([...selectedSongs, id]);
  };

  const handleRemoveSong = (id: string) => {
    setSelectedSongs(selectedSongs.filter(s => s !== id));
  };

  const {data: songs} = useQuery({
    queryKey: ["artistSongs"],
    queryFn: ()=> artistApi.fetchSongs()
  })

 let filteredSong = songs?.filter(song =>
  song.title.toLowerCase().includes(searchValue.toLowerCase())
);

const songList = searchValue.trim() ? filteredSong : songs;



const HandleUpload = async (data: CreateAlbumData) => {
  console.log("api start")
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (coverImage) {
      formData.append("coverImageUrl", coverImage);
    }

    selectedSongs.forEach(songId => {
      formData.append("songId", songId);
    });

    await CreateAlbum(formData);
    Navigate("/artist-albums");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="">
        <h1 className="text-4xl font-bold mb-12 text-center">Create Album</h1>
      <form onSubmit={handleSubmit(HandleUpload)}>
        <div className="space-y-8">
          {/* Cover Image */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-medium mb-4 uppercase tracking-wide">Title Card</label>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="cover-image"
                  onChange={handleImageUpload}
                />

                <label
                  htmlFor="cover-image"
                  className="block w-48 h-48 bg-zinc-900 border border-zinc-700 rounded-lg cursor-pointer hover:border-green-500 transition overflow-hidden"
                >
                  {previewUrl ? (
                    <div className="relative w-full h-full group">
                      <img src={previewUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <button
                          type="button"
                          className="bg-red-500 p-2 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Upload size={40} className="mb-2 text-zinc-600" />
                      <p className="text-xs text-zinc-500">Upload cover</p>
                    </div>
                  )}
                </label>
                { errors.image && <p className='text-red-500 text-sm mt-1'>{errors.image?.message}</p>}
              </div>
            </div>

            {/* Title + Description (dummy inputs) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* title */}
              <div>
                <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Title</label>
                <Input {...register('title')} theme='artist' type="text"  placeholder="Album Title" error={errors.title?.message} errorTheme='red'/>
              </div>

                {/* description */}
              <div>
                <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Description</label>
                <Input  {...register('description')} theme='artist'  type="text" placeholder="Description" error={errors.description?.message} errorTheme='red'/>
              </div>

                {/* select songs */}
              <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium uppercase tracking-wide">Add Track</label>
              </div>

              <div className="relative">
                <div
                  onClick={() => setShowSongSearch(!showSongSearch)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer hover:border-green-500 transition flex items-center justify-between"
                >
                  <span className="text-zinc-400 text-sm">Songs - {selectedSongs.length}</span>
                  <Plus size={20} className="text-zinc-600" />
                </div>

                {showSongSearch && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg z-10 shadow-lg max-h-64 overflow-y-auto">
                    {songList.map(song => (
                      !selectedSongs.includes(song._id) && (
                        <button
                          key={song.id}
                          type="button"
                          onClick={() => handleAddSong(song._id)}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800 rounded text-sm text-zinc-300 hover:text-white transition"
                        >
                          {song.title}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
              
              </div>
              {/*  Search Box */}
                <div>
                <label className="block text-sm font-medium mb-4 uppercase tracking-wide">Search Track</label>
                <Input  type="text" placeholder="Track Name"  value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} theme='artist' />
                </div>
            </div>
          </div>

          {/* Selected Tracks */}
          {selectedSongs.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-4 uppercase tracking-wide">Selected Tracks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {songs && songs
                  .filter(song => selectedSongs.includes(song._id))
                  .map(song => (
                    <div
                      key={song.id}
                      className="relative group bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-zinc-900 flex items-center justify-center text-zinc-600">
                        <Music size={32} />
                      </div>

                      <div className="p-3">
                        <p className="text-xs font-medium text-zinc-300 truncate">{song.title}</p>
                        <p className="text-xs text-zinc-500">{song.genre}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSong(song._id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-8 justify-center">
            <Button theme='artist' type='button'  onClick={() => window.history.back()}>
              CANCEL
            </Button>
            <Button theme='artist' type='submit'>
              CREATE
            </Button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

import { CreateAlbumData, CreateAlbumSchema } from "@/features/artist/schema-validator/createAlbum.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useApi } from "../useApi";
import { artistApi } from "@/features/artist/services/artist.api";
import { useArtistSongs } from "../useFetchHooks";

export const useCreateAlbum = ()=>{
    
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

        const {data: songs} = useArtistSongs()


        let filteredSong = songs?.filter(song =>
        song.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        const songList = searchValue.trim() ? filteredSong : songs;



    const HandleUpload = async (data: CreateAlbumData) => {
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

    return {
        previewUrl,
        showSongSearch,
        setShowSongSearch,
        setSearchValue,
        register,
        handleSubmit,
        errors,
        handleImageUpload,
        handleAddSong,
        handleRemoveSong,
        songList,
        HandleUpload,
        selectedSongs,
        searchValue,
        songs
    }
}
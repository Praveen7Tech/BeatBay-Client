import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateAlbumSchema, CreateAlbumData } from "@/features/artist/schema-validator/createAlbum.Schema";
import { artistApi, EditAlbumDetailsResponse, InitialAlbumSongs } from "@/features/artist/services/artist.api";
import { useNavigate, useParams } from "react-router-dom";
import { useArtistSongs } from "../api/useFetchHooks";
import { queryClient } from "./queryClientSetup";

export const useCreateAlbum = (isEdit: boolean) => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const {albumId} = useParams()

  // fetch Initial Album Data
  const {data: InitialAlbumData} = useQuery({
    queryKey: ["albumDetailsById", albumId],
    queryFn: ()=> artistApi.getAlbumById(albumId!),
    enabled: isEdit
  })

  // validator 
  const { register, handleSubmit,setValue,formState: { errors }, } = useForm<CreateAlbumData>({
    resolver: zodResolver(CreateAlbumSchema(isEdit)),
    defaultValues: {
      songIds: [],
    },
  });

  // set Initial album data for editing
  const setInitialFormData = (album: EditAlbumDetailsResponse) =>{
    setValue("title", album.title)
    setValue("description", album.description)
    setPreviewUrl(album.coverImageUrl)

    // select songs id already in the album
    const ids = album.songs.map((al:InitialAlbumSongs)=> al.id)
    setValue("songIds", ids)
    setSelectedSongs(ids)
  }

  // trigger editing when edit mode active
  useEffect(()=>{
    if(InitialAlbumData){
      setInitialFormData(InitialAlbumData)
    }
  },[InitialAlbumData, isEdit])

  //  Song Fetching
  const { data: songs = [] } = useArtistSongs();

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    }
  };

  // Add Song
  const handleAddSong = (id: string) => {
    if (!selectedSongs.includes(id)) {
      const updated = [...selectedSongs, id];
      setSelectedSongs(updated);
      setValue("songIds", updated, { shouldValidate: true });
    }
  };

  // Remove Song
  const handleRemoveSong = (id: string) => {
    const updated = selectedSongs.filter((song) => song !== id);
    setSelectedSongs(updated);
    setValue("songIds", updated, { shouldValidate: true });
  };

  // Filtered songs
  const filteredSongs = searchValue.trim()
    ? songs.filter((s) =>
        s.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : songs;

  // Create Album Mutation
  const CreateMutation = useMutation({
    mutationFn: (formData: FormData) => artistApi.createAlbum(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      navigate("/artist/albums");
    },
  });

  // Edit album Mutation
  const EditMutation = useMutation({
    mutationFn: (formData :FormData)=> artistApi.editAlbum(albumId!,formData),
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ["albums"]})
      queryClient.invalidateQueries({queryKey: ["albumDetailsById"]})
      navigate("/artist/albums");
    }
  })

  // Handle Submit
  const HandleUpload = (data: CreateAlbumData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if(data.image instanceof File){
      formData.append("coverImageUrl", data.image)
    }

    data.songIds.forEach((id) => {
      formData.append("songs", id);
    });

    if(isEdit){
      EditMutation.mutate(formData)
    }else{
      CreateMutation.mutate(formData)
    }
  };

  return {
    previewUrl,
    showSongSearch,
    setShowSongSearch,
    searchValue,
    setSearchValue,
    register,
    handleSubmit,
    errors,
    filteredSongs,
    handleAddSong,
    handleRemoveSong,
    handleImageUpload,
    HandleUpload,
    selectedSongs,
    songs,
    isLoading: CreateMutation.isPending
  };
};

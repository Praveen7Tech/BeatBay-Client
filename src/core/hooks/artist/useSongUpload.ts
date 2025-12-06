import { SongUploadData, UploadSongSchema } from "@/features/artist/schema-validator/upLoadSong.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SongResponse } from "@/features/user/services/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./queryClientSetup";
import { artistApi } from "@/features/artist/services/artist.api";

export const useSongUpload = (isEdit: boolean) => {
  const navigate = useNavigate();
  const { songId } = useParams();

  // Initial song data when edit
  const { data: initialSongData, isLoading: dataLoading } = useQuery({
    queryKey: ["songDetails", songId],
    queryFn: () => artistApi.getSongById(songId!),
    enabled: isEdit,
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [trackFileName, setTrackFileName] = useState<string | null>(null);
  const [lrcFileName, setLrcFileName] = useState<string | null>(null);


  // setup the dynamic image selection based on edit and upload
  const BASEURL = import.meta.env.VITE_API_URL;
  const CoverImageURL = coverPreview
  ? coverPreview.startsWith("blob:")
    ? coverPreview                          
    : `${BASEURL}/songs/${coverPreview}`    
  : null;
  const schema = UploadSongSchema(isEdit);


  // form validation when upload
  const { register, handleSubmit, setValue, watch, formState: { errors },} = useForm<SongUploadData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      tags: "",
    },
  });


  const fileInputRef = useRef<HTMLInputElement>(null);
  const trackInputRef = useRef<HTMLInputElement>(null);
  const lrcInputRef = useRef<HTMLInputElement>(null);

  // watch the file
  const coverImageField = watch("coverImage");


  // handle song file and lrc 
  const handleFileChange = (field: keyof SongUploadData, files: FileList | null) => {
    if (!files || !files.length) return;

    const file = files[0];
    setValue(field, file, { shouldValidate: true });

    if (field === "trackFile") setTrackFileName(file.name);
    if (field === "lrcFile") setLrcFileName(file.name);
  };

  // set initial song details to the fields
  const setInitialFormData = (song: SongResponse) => {
    setValue("title", song.title);
    setValue("description", song.description);
    setValue("genre", song.genre[0] || "");
    setValue("tags", song.tags.join(", "));

    setValue("coverImage", song.coverImageUrl ?? "existing");
    setValue("trackFile", song.audioUrl ?? "existing");
    setValue("lrcFile", song.lyricsUrl ?? "existing");

    setCoverPreview(song.coverImageUrl);
    setTrackFileName(song.audioUrl);
    setLrcFileName(song.lyricsUrl);
  };

 // update the initial song details when edit song
  useEffect(() => {
    if (initialSongData) {
      setInitialFormData(initialSongData);
    }
  }, [initialSongData]);

  // change the cover image when file change
  useEffect(() => {
    if (coverImageField instanceof File) {
      const url = URL.createObjectURL(coverImageField);
      setCoverPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [coverImageField]);

 // Song Mutation function when editing the song
  const SongMutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (isEdit && songId) {
        return artistApi.updateSong(songId, formData);
      } else {
        return artistApi.uploadSong(formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      navigate("/artist-songs");
    },
    onError: (error) => {
      console.error("song mutation error", error);
    },
  });

  // submit edit/ upload function
  const Onsubmit: SubmitHandler<SongUploadData> = async (data) => {
    const formData = new FormData();

    if (isEdit) formData.append("songId", songId!);

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("genre", data.genre);
    formData.append("tags", data.tags);

    if (data.coverImage instanceof File) formData.append("coverImage", data.coverImage);
    if (data.trackFile instanceof File) formData.append("trackFile", data.trackFile);
    if (data.lrcFile instanceof File) formData.append("lrcFile", data.lrcFile);

    SongMutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    errors,
    fileInputRef,
    trackInputRef,
    lrcInputRef,
    coverPreview,
    trackFileName,
    lrcFileName,
    handleFileChange,
    Onsubmit,
    setInitialFormData,
    isLoading: SongMutation.isPending,
    CoverImageURL,
    dataLoading,
  };
};

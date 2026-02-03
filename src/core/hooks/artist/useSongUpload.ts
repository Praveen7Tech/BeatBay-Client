import { SongUploadData, UploadSongSchema } from "@/features/artist/schema-validator/upLoadSong.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./queryClientSetup";
import { artistApi, FileForUploadUrl } from "@/features/artist/services/artist.api";
import { SongResponse } from "@/features/user/services/response.type";

// const extractFilenameFromUrl = (url: string | undefined | null): string | null => {
//   if (!url) return null;
//   // This extracts the path segment after the last slash
//   const parts = url.split('/');
//   return parts[parts.length - 1];
// };
export const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);

    audio.preload = "metadata";
    audio.src = url;

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration); // duration in seconds
    };

    audio.onerror = () => {
      reject("Failed to load audio metadata");
    };
  });
};


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
  const [isLoading, setIsLoading] = useState(false)


  // setup the dynamic image selection based on edit and upload
  const CoverImageURL = coverPreview
  ? coverPreview.startsWith("blob:")
    ? coverPreview                          
    : coverPreview  
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
    setValue("genre", song.genre);
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

 
  const Onsubmit: SubmitHandler<SongUploadData> = async (data) => {
      try {
        setIsLoading(true);
       const filesForUrl: FileForUploadUrl[] = [];

        if (data.coverImage instanceof File)
          filesForUrl.push({
            field: "cover", fileName: data.coverImage.name, mimeType: data.coverImage.type, });

        if (data.trackFile instanceof File)
          filesForUrl.push({
            field: "audio",  fileName: data.trackFile.name,  mimeType: data.trackFile.type, });

        if (data.lrcFile instanceof File)
          filesForUrl.push({
            field: "lrc", fileName: data.lrcFile.name, mimeType: data.lrcFile.type,  });


        // Get URLs only for the new files
       const response = filesForUrl.length > 0 
          ? await artistApi.getSongUploadUrls(filesForUrl, isEdit ? initialSongData?.uploadId : undefined) 
          : null;

        const urls = response?.links;
        const finalSongId = response?.uploadId || initialSongData?.uploadId

        //  upload only the new files
        if (data.coverImage instanceof File && urls?.cover) {
          await artistApi.uploadToS3(urls.cover.uploadUrl, data.coverImage);
        }
        if (data.trackFile instanceof File && urls?.audio) {
          await artistApi.uploadToS3(urls.audio.uploadUrl, data.trackFile);
        }
        if (data.lrcFile instanceof File && urls?.lrc) {
          await artistApi.uploadToS3(urls.lrc.uploadUrl, data.lrcFile);
        }

        // construct Payload: Use NEW key if uploaded, else keep OLD key from initial data
        const payload = {
          uploadId:finalSongId,
          title: data.title,
          description: data.description,
          genre: data.genre,
          tags: data.tags,
          //  duration is calculated for new file, use it; otherwise, backend keeps old
          duration: data.trackFile instanceof File ? await getAudioDuration(data.trackFile) : initialSongData?.duration,

          // key selection based on u[date/edit]
          coverKey: urls?.cover?.key,
          audioKey: urls?.audio?.key,
          lyricsKey: urls?.lrc?.key ,
        };

        if (isEdit && songId) {
          await artistApi.updateSong(songId, payload);
        } else {
          await artistApi.uploadSong(payload);
        }

        queryClient.invalidateQueries({ queryKey: ["songs"] });
        navigate('/artist/songs');
      } catch (error) {
        console.error("Failed to song upload", error);
      } finally {
        setIsLoading(false);
      }
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
    isLoading,
    CoverImageURL,
    dataLoading,
  };
};

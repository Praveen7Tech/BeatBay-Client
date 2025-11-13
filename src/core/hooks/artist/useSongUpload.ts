import { SongUploadData, UploadSongSchema } from "@/features/artist/schema-validator/upLoadSong.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../useApi";

interface UploadResponse {
  message: string
}

export const useSongUpload = (uploadApi: (data: FormData)=> Promise<UploadResponse>)=>{
      const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SongUploadData>({
        resolver: zodResolver(UploadSongSchema),
        defaultValues: {
          title: "",
          description: "",
          genre: "",
          tags: "",
          album: "",
          lyrics: "",
          releaseDate: "",
        }
      });

      const {execute} = useApi(uploadApi)

    const fileInputRef = useRef<HTMLInputElement>(null);
    const trackInputRef = useRef<HTMLInputElement>(null);
    const lrcInputRef = useRef<HTMLInputElement>(null);

     const coverImageFile = watch('coverImage');
      const trackFile = watch('trackFile');
      const lrcFile = watch("lrcFile");
    
      const coverPreview = coverImageFile ? URL.createObjectURL(coverImageFile) : null;
      const trackFileName = trackFile?.name;
      const lrcFileName = lrcFile?.name;
    
      const handleFileChange = (fieldName: keyof SongUploadData, files: FileList | null) => {
        if (files && files.length > 0) {
          setValue(fieldName, files[0]);
        }
      };
    
      const Onsubmit: SubmitHandler<SongUploadData> = async (data) => {
        const formData = new FormData();
    
        formData.append('title', data.title); 
        formData.append('description', data.description || '');
        formData.append('genre', data.genre);
        formData.append('tags', data.tags || '');
        formData.append('album', data.album || '');
        formData.append('lyrics', data.lyrics || '');
        formData.append('releaseDate', data.releaseDate);
    
        // Append files (Zod ensures they exist at this point)
        formData.append('coverImage', data.coverImage);
        formData.append('trackFile', data.trackFile);
        formData.append('lrcFile', data.lrcFile);
    
        console.log("data ",formData)
         for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File Name: ${value.name}, Size: ${value.size} bytes, Type: ${value.type}`);
            } else {
                console.log(`${key}: ${value}`);
        }
    }
        try {
          const res = await execute(formData)
          return res
        } catch (error) {
          console.error("error in upload song", error);
        }
      };


      return {register, handleSubmit, errors, fileInputRef, trackInputRef, lrcInputRef, coverPreview, trackFileName, lrcFileName, handleFileChange, Onsubmit}
}
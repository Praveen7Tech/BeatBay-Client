
import z from "zod";

// Helper schema for required file inputs with constraints
const requiredAudioFileSchema = z.instanceof(File, { message: "Audio file is required" })
  .refine(file => file.type.startsWith("audio/"), "Invalid audio format");

const requiredImageFileSchema = z.instanceof(File, { message: "Cover image is required" })
  .refine(file => file.type.startsWith("image/"), "Invalid image format");

const optionalFileSchema = z.instanceof(File, { message: "Lyrics file is required" })

export const UploadSongSchema = z.object({
    title: z.string().min(2, "Title must have at least 2 characters"),
    genre: z.string().min(1, "Genre is required"),
    releaseDate: z.string().min(1, "Release date is required"), 

    description: z.string().min(5, "brief about your track"),
    tags: z.string().min(1, "atleast 1 tag required"),
    album: z.string(),
    lyrics: z.string(),

    // --- File Fields ---
    trackFile: requiredAudioFileSchema,
    coverImage: requiredImageFileSchema,
    lrcFile: optionalFileSchema,
});

export type SongUploadData = z.infer<typeof UploadSongSchema>;

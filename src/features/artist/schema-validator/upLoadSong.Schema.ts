import z from "zod";

// Required schemas for upload mode
const requiredAudioFileSchema = z.instanceof(File, { message: "Audio file is required" })
  .refine(file => file.type.startsWith("audio/"), "Invalid audio format");

const requiredImageFileSchema = z.instanceof(File, { message: "Cover image is required" })
  .refine(file => file.type.startsWith("image/"), "Invalid image format");

const requiredLrcFileSchema = z
  .instanceof(File, { message: "Lyrics file is required" })
  .refine(
    (file) => file.type === "text/plain" && file.name.endsWith(".txt"),
    { message: "Only .txt lyrics files are allowed" }
  );

// This is the critical fix
const optionalFileOrString = z.union([
  z.string().min(1),       // existing URL
  z.instanceof(File)       // newly uploaded file
]).optional();

export const UploadSongSchema = (isEdit: boolean) => z.object({
  title: z.string().min(2),
  genre: z.string().min(1),
  //releaseDate: z.string().min(1),
  description: z.string().min(5),
  tags: z.string().min(1),
  album: z.string().optional(),
  lyrics: z.string().optional(),

  trackFile: isEdit ? optionalFileOrString : requiredAudioFileSchema,
  coverImage: isEdit ? optionalFileOrString : requiredImageFileSchema,
  lrcFile: isEdit ? optionalFileOrString : requiredLrcFileSchema,
});

export type SongUploadData = z.infer<ReturnType<typeof UploadSongSchema>>;

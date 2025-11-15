
import z from "zod";

export const CreateAlbumSchema = z.object({
    title: z.string().min(2, "Ttitle should be atleast 2 charecters"),
    description: z.string().min(1, "description required"),
    image: z.instanceof(File, {message: "Invalid file format"})
})

export type CreateAlbumData = z.infer<typeof CreateAlbumSchema>
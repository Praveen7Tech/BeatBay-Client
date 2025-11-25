
import z from "zod";

export const CreateAlbumSchema = z.object({
    title: z.string().min(2, "Ttitle should be atleast 2 charecters"),
    description: z.string().min(1, "description required"),
    image: z.instanceof(File, {message: "Invalid file format"}),
    songIds: z.array(z.string()).min(1, "Please select at least 1 track") 
})

export type CreateAlbumData = z.infer<typeof CreateAlbumSchema>
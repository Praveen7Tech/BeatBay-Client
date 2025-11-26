
import z from "zod";

// optional schema for while editing file
const optionalFileOrString = z.union([
  z.string().min(1),       
  z.instanceof(File)       
]).optional();

export const CreateAlbumSchema = (isEdit: boolean) => z.object({
    title: z.string().min(2, "Ttitle should be atleast 2 charecters"),
    description: z.string().min(1, "description required"),
    songIds: z.array(z.string()).min(1, "Please select at least 1 track") ,

    image: isEdit ? optionalFileOrString : z.instanceof(File, {message: "Invalid file format"}),
})

export type CreateAlbumData = z.infer<ReturnType<typeof CreateAlbumSchema>>
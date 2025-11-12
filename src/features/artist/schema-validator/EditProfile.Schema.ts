import { nameValidator } from "@/core/validators/validationShemas";
import z from "zod";

export const ProfileDetailsSchema = z.object({
    name: nameValidator.optional(),
    bio: z.string().min(10,"atleast 10 letters about you").optional(),
    image: z.instanceof(File, { message: "Invalid file format" }).optional(),
});

export type ProfileDetailsData = z.infer<typeof ProfileDetailsSchema>;
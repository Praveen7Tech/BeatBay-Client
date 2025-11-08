import { bio, nameValidator, passwordValidator } from "@/core/validators/validationShemas";
import z from "zod";

export const EditProfileSchema = z.object({
    name: nameValidator.optional(),
    bio: bio.optional(),
    password: z.string()
       .optional()
         .transform((val) => (val === "" ? undefined : val))
         .pipe(passwordValidator.optional()),
       confirmPassword: z.string()
         .transform((val) => (val === "" ? undefined : val))
         .optional(),
         image: z.instanceof(File, {message:"Invalid file format"}).optional(),
     })
     .refine((data) => !data.password || data.password === data.confirmPassword, {
       message: "Passwords do not match",
       path: ["confirmPassword"],
     })

export type EditProfileData = z.infer<typeof EditProfileSchema>
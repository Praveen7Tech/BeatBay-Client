import z from "zod"


export const EditProfileSchema = z
  .object({
    name: z.string().min(2, "Name is required").optional(),
    password: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),
    image: z.any().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type EditProfileData = z.infer<typeof EditProfileSchema>
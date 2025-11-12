

import { passwordValidator } from "@/core/validators/validationShemas";
import z from "zod";

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordValidator,
    confirmPassword: z.string().min(1, "Confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

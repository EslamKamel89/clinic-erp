import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "validation.username_required"),
  password: z.string().min(1, "validation.password_required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

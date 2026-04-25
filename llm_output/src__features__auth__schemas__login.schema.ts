import { z } from "zod";

export const loginSchema = z.object({
  // will be use in the ui like this t("validation:username_required") where validation is the namespace
  username: z.string().min(1, "username_required"),
  password: z.string().min(1, "password_required"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from "zod";

export const countrySchema = z.object({
  Obj_Name: z.string().min(1, "name_required"),
  PhoneCode: z.string().optional(),
  Notes: z.string().optional(),
});
export type CountryFormData = z.infer<typeof countrySchema>;

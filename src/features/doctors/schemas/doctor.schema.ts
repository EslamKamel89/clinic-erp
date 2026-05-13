import { z } from "zod";
/* 
 the only required fields are 
    Obj_Name
    Gender_Name
    Gender_ID
    Millitary_ID
    Branch_ID
    Specialty_ID 
*/
export const doctorSchema = z.object({
  name: z.string().min(1, "name_required"),

  active: z.boolean(),

  nationalId: z.string(),

  address: z.string(),

  phone: z.string(),

  mobile: z.string(),
  // the mail method exist and the .string().email is depreciated
  email: z.email({ message: "invalid_email" }).nullable(),
  genderId: z.number({
    message: "gender_required",
  }),

  branchId: z.number({
    message: "branch_required",
  }),

  socialId: z.string(),

  maritalStatusId: z.number().nullable(),

  militaryStatusId: z.number({
    message: "military_status_required",
  }),

  birthDate: z.string(),

  countryId: z.number().nullable(),

  stateId: z.number().nullable(),

  cityId: z.number().nullable(),

  notes: z.string(),

  specialtyId: z.number({
    message: "specialty_required",
  }),
});

export type DoctorSchema = z.infer<typeof doctorSchema>;

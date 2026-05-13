import type { SelectOption } from "@/shared/lib/api/types";

export type DoctorLookups = {
  genders: SelectOption[];

  branches: SelectOption[];

  countries: SelectOption[];

  maritalStatuses: SelectOption[];

  militaryStatuses: SelectOption[];

  specialties: SelectOption[];
};

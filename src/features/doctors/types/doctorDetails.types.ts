import type { SelectOption } from "@/shared/lib/api/types";
import type { Doctor, DoctorRaw } from "./doctor.types";
import type { DoctorLookups } from "./doctorLookup.types";

export type DoctorDetailsResponseRaw = {
  Result: boolean;
  Message: string;
  data?: DoctorRaw;
  Gender: SelectOption[];
  Branches: SelectOption[];
  Country: SelectOption[];
  Marital_Status: SelectOption[];
  Military_Status: SelectOption[];
  Specialties: SelectOption[];
};

export type DoctorDetailsModel = {
  doctor: Doctor | null;

  lookups: DoctorLookups;
};

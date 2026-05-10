import type { SelectOption } from "@/shared/lib/api/types";

export type EmployeeLookups = {
  genders: SelectOption[];

  branches: SelectOption[];

  countries: SelectOption[];

  maritalStatuses: SelectOption[];

  militaryStatuses: SelectOption[];

  jobs: SelectOption[];
};

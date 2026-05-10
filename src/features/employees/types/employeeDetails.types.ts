import type { SelectOption } from "@/shared/lib/api/types";
import type { Employee, EmployeeRaw } from "./employee.types";
import type { EmployeeLookups } from "./employeeLookup.types";

export type EmployeeDetailsResponseRaw = {
  Result: boolean;
  Message: string;
  data?: EmployeeRaw;
  Gender: SelectOption[];
  Branches: SelectOption[];
  Country: SelectOption[];
  Marital_Status: SelectOption[];
  Military_Status: SelectOption[];
  Jobs: SelectOption[];
};

export type EmployeeDetailsModel = {
  employee: Employee | null;

  lookups: EmployeeLookups;
};

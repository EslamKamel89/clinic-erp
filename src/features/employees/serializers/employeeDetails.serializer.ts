import type {
  EmployeeDetailsModel,
  EmployeeDetailsResponseRaw,
} from "../types/employeeDetails.types";
import { serializeEmployee } from "./employee.serializer";

export function serializeEmployeeDetailsResponse(
  raw: EmployeeDetailsResponseRaw,
): EmployeeDetailsModel {
  return {
    employee: raw.data
      ? serializeEmployee({
          ...raw.data,
        })
      : null,
    lookups: {
      genders: raw.Gender ?? [],
      branches: raw.Branches ?? [],
      countries: raw.Country ?? [],
      maritalStatuses: raw.Marital_Status ?? [],
      militaryStatuses: raw.Military_Status ?? [],
      jobs: raw.Jobs ?? [],
    },
  };
}

import type { Employee } from "../types/employee.types";
import type { EmployeeFormValues } from "../types/employeeForm.types";

export function serializeEmployeeToFormValues(
  employee: Employee,
): EmployeeFormValues {
  return {
    name: employee.name,
    active: employee.active,
    nationalId: employee.nationalId,
    address: employee.address,
    phone: employee.phone,
    mobile: employee.mobile,
    email: employee.email,
    genderId: employee.genderId ?? undefined,
    branchId: employee.branchId ?? undefined,
    socialId: employee.socialId,
    maritalStatusId: employee.maritalStatusId,
    militaryStatusId: employee.militaryStatusId ?? undefined,
    birthDate: employee.birthDate ? employee.birthDate.split("T")[0] : "",
    countryId: employee.countryId,
    stateId: employee.stateId,
    cityId: employee.cityId,
    notes: employee.notes,
    jobId: employee.jobId ?? undefined,
  };
}

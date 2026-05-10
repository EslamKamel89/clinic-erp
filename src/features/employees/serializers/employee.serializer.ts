import type { Employee, EmployeeRaw } from "../types/employee.types";

export function serializeEmployee(raw: EmployeeRaw): Employee {
  return {
    id: raw.ID ?? 0,
    name: raw.Obj_Name ?? "",
    active: raw.Active ?? false,
    nationalId: raw.IDNo ?? "",
    address: raw.Address ?? "",
    phone: raw.Phone ?? "",
    mobile: raw.Mobile ?? "",
    email: raw.Email ?? "",
    genderName: raw.Gender_Name ?? "",
    genderId: raw.Gender_ID,
    branchName: raw.Branch_Name ?? "",
    branchId: raw.Branch_ID,
    socialId: raw.SocialID ?? "",
    maritalStatusName: raw.Marital_Name ?? "",
    maritalStatusId: raw.Marital_Status,
    militaryStatusName: raw.Millitary_Name ?? "",
    militaryStatusId: raw.Millitary_ID,
    birthDate: raw.BirthDate ?? "",
    countryName: raw.Country_Name ?? "",
    countryId: raw.Country_ID,
    stateName: raw.State_Name ?? "",
    stateId: raw.State_ID,
    cityName: raw.City_Name ?? "",
    cityId: raw.City_ID,
    notes: raw.Notes ?? "",
    jobId: raw.Job_ID ?? 0,
    jobName: raw.Job_Name ?? "",
  };
}

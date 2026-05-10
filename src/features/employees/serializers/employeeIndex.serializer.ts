import type { Employee, EmployeeRaw } from "../types/employee.types";

export const serializeEmployeeIndexResponse = (
  employeesRaw: EmployeeRaw[],
): Employee[] => {
  return employeesRaw.map((employee) => ({
    id: employee.ID ?? 0,
    name: employee.Obj_Name ?? "",
    active: employee.Active ?? false,
    nationalId: employee.IDNo ?? "",
    address: employee.Address ?? "",
    phone: employee.Phone ?? "",
    mobile: employee.Mobile ?? "",
    email: employee.Email ?? "",
    genderName: employee.Gender_Name ?? "",
    genderId: employee.Gender_ID,
    branchName: employee.Branch_Name ?? "",
    branchId: employee.Branch_ID,
    socialId: employee.SocialID ?? "",
    maritalStatusName: employee.Marital_Name ?? "",
    maritalStatusId: employee.Marital_Status,
    militaryStatusName: employee.Millitary_Name ?? "",
    militaryStatusId: employee.Millitary_ID,
    birthDate: employee.BirthDate ?? "",
    countryName: employee.Country_Name ?? "",
    countryId: employee.Country_ID,
    districtName: employee.State_Name ?? "",
    districtId: employee.State_ID,
    cityName: employee.City_Name ?? "",
    cityId: employee.City_ID,
    notes: employee.Notes ?? "",
    jobId: employee.Job_ID ?? 1,
    jobName: employee.Job_Name ?? "",
  }));
};

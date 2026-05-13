import type { DoctorFormValues } from "../types/doctorForm.types";

export function serializeDoctorPayload(values: DoctorFormValues) {
  return {
    Obj_Name: values.name,
    Active: values.active,
    IDNo: values.nationalId,
    Address: values.address,
    Phone: values.phone,
    Mobile: values.mobile,
    Email: values.email,
    Gender_ID: values.genderId,
    Branch_ID: values.branchId,
    SocialID: values.socialId,
    Marital_Status: values.maritalStatusId,
    Millitary_ID: values.militaryStatusId,
    BirthDate: values.birthDate,
    Country_ID: values.countryId,
    State_ID: values.stateId,
    City_ID: values.cityId,
    Notes: values.notes || null,
    Specialty_ID: values.specialtyId,
  };
}

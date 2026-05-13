import type { DoctorFormValues } from "../types/doctorForm.types";
import type { DoctorPayload } from "../types/doctorRequest.types";

export function serializeDoctorRequest(
  values: DoctorFormValues,
): DoctorPayload {
  return {
    Obj_Name: values.name,
    Active: values.active,
    IDNo: values.nationalId,
    Address: values.address,
    Phone: values.phone,
    Mobile: values.mobile,
    Email: values.email,
    Gender_ID: values.genderId ?? null,
    Branch_ID: values.branchId ?? null,
    SocialID: values.socialId,
    Marital_Status: values.maritalStatusId,
    Millitary_ID: values.militaryStatusId ?? null,
    BirthDate: values.birthDate || null,
    Country_ID: values.countryId,
    State_ID: values.stateId,
    City_ID: values.cityId,
    Specialty_ID: values.specialtyId ?? null,
    Notes: values.notes || null,
  };
}

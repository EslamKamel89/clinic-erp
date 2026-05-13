import type { Doctor } from "../types/doctor.types";
import type { DoctorFormValues } from "../types/doctorForm.types";

export function serializeDoctorToFormValues(doctor: Doctor): DoctorFormValues {
  return {
    name: doctor.name,
    active: doctor.active,
    nationalId: doctor.nationalId,
    address: doctor.address,
    phone: doctor.phone,
    mobile: doctor.mobile,
    email: doctor.email,
    genderId: doctor.genderId ?? undefined,
    branchId: doctor.branchId ?? undefined,
    socialId: doctor.socialId,
    maritalStatusId: doctor.maritalStatusId,
    militaryStatusId: doctor.militaryStatusId ?? undefined,
    birthDate: doctor.birthDate ? doctor.birthDate.split("T")[0] : "",
    countryId: doctor.countryId,
    stateId: doctor.stateId,
    cityId: doctor.cityId,
    notes: doctor.notes,
    specialtyId: doctor.specialtyId ?? undefined,
  };
}

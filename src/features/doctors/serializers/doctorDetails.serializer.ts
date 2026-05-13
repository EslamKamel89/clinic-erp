import type {
  DoctorDetailsModel,
  DoctorDetailsResponseRaw,
} from "../types/doctorDetails.types";
import { serializeDoctor } from "./doctor.serializer";

export function serializeDoctorDetailsResponse(
  raw: DoctorDetailsResponseRaw,
): DoctorDetailsModel {
  return {
    doctor: raw.data
      ? serializeDoctor({
          ...raw.data,
        })
      : null,
    lookups: {
      genders: raw.Gender ?? [],
      branches: raw.Branches ?? [],
      countries: raw.Country ?? [],
      maritalStatuses: raw.Marital_Status ?? [],
      militaryStatuses: raw.Military_Status ?? [],
      specialties: raw.Specialties ?? [],
    },
  };
}

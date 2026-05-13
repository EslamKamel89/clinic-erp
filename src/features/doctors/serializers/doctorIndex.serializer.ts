import type { Doctor, DoctorRaw } from "../types/doctor.types";
import { serializeDoctor } from "./doctor.serializer";

export const serializeDoctorIndexResponse = (
  doctorsRaw: DoctorRaw[],
): Doctor[] => {
  return doctorsRaw.map(serializeDoctor);
};

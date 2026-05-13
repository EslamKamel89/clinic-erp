import type { AppError } from "@/shared/lib/api/error";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { doctorDetailsApi } from "../api/doctorDetails.api";
import { serializeDoctorDetailsResponse } from "../serializers/doctorDetails.serializer";
import type { DoctorDetailsModel } from "../types/doctorDetails.types";

export function useDoctorDetails(id: number) {
  return useQuery<DoctorDetailsModel, AppError>({
    queryKey: queryClientKeys.doctors.details(id),
    queryFn: async () => {
      const res = await doctorDetailsApi(id);
      return serializeDoctorDetailsResponse(res);
    },
    staleTime: Infinity,
  });
}

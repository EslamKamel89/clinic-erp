import { appRoutes } from "@/features/navigation/routes";
import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { doctorUpdateApi } from "../api/doctorUpdate.api";
import { serializeDoctorRequest } from "../serializers/doctorRequest.serializer";
import type { DoctorFormValues } from "../types/doctorForm.types";

type Payload = {
  id: number;
  values: DoctorFormValues;
};
export function useUpdateDoctor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, AppError, Payload>({
    mutationFn: async (data: Payload) => {
      const payload = serializeDoctorRequest(data.values);
      return await doctorUpdateApi(data.id, payload);
    },
    onSuccess: (data) => {
      showSuccessToast(data.Message);
      queryClient.invalidateQueries({
        queryKey: queryClientKeys.doctors.main,
      });
      navigate(appRoutes.doctor.index);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
}

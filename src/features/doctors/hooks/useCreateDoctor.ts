import { appRoutes } from "@/features/navigation/routes";
import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { doctorCreateApi } from "../api/doctorCreate.api";
import { serializeDoctorRequest } from "../serializers/doctorRequest.serializer";
import type { DoctorFormValues } from "../types/doctorForm.types";

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, AppError, DoctorFormValues>({
    mutationFn: async (values: DoctorFormValues) => {
      const payload = serializeDoctorRequest(values);
      return await doctorCreateApi(payload);
    },
    onSuccess: async (data) => {
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

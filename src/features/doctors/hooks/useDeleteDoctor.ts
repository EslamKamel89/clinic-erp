import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorDeleteApi } from "../api/doctorDelete.api";

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, AppError, number>({
    mutationFn: async (id: number) => {
      return await doctorDeleteApi(id);
    },
    onSuccess: async (data) => {
      showSuccessToast(data.Message);
      await queryClient.invalidateQueries({
        queryKey: queryClientKeys.doctors.main,
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
}

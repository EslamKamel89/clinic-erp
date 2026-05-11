import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { employeeDeleteApi } from "../api/employeeDelete.api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, AppError, number>({
    mutationFn: async (id: number) => {
      return await employeeDeleteApi(id);
    },
    onSuccess: async (data) => {
      showSuccessToast(data.Message);
      await queryClient.invalidateQueries({
        queryKey: queryClientKeys.employees.main,
      });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
}

import { appRoutes } from "@/features/navigation/routes";
import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { employeeCreateApi } from "../api/employeeCreate.api";
import { serializeEmployeeRequest } from "../serializers/employeeRequest.serializer";
import type { EmployeeFormValues } from "../types/employeeForm.types";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, AppError, EmployeeFormValues>({
    mutationFn: async (values: EmployeeFormValues) => {
      const payload = serializeEmployeeRequest(values);
      return await employeeCreateApi(payload);
    },
    onSuccess: async (data) => {
      showSuccessToast(data.Message);
      queryClient.invalidateQueries({
        queryKey: queryClientKeys.employees.main,
      });
      navigate(appRoutes.employee.index);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
}

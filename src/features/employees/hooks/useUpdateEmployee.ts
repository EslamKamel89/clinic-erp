import { appRoutes } from "@/features/navigation/routes";
import type { AppError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { employeeUpdateApi } from "../api/employeeUpdate.api";
import { serializeEmployeeRequest } from "../serializers/employeeRequest.serializer";
import type { EmployeeFormValues } from "../types/employeeForm.types";

type Payload = {
  id: number;
  values: EmployeeFormValues;
};
export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, AppError, Payload>({
    mutationFn: async (data: Payload) => {
      const payload = serializeEmployeeRequest(data.values);
      return await employeeUpdateApi(data.id, payload);
    },
    onSuccess: (data) => {
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

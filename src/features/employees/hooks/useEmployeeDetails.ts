import type { AppError } from "@/shared/lib/api/error";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { employeeDetailsApi } from "../api/employeeDetails.api";
import { serializeEmployeeDetailsResponse } from "../serializers/employeeDetails.serializer";
import type { EmployeeDetailsModel } from "../types/employeeDetails.types";

export function useEmployeeDetails(id: number) {
  return useQuery<EmployeeDetailsModel, AppError>({
    queryKey: queryClientKeys.employees.details(id),
    queryFn: async () => {
      const res = await employeeDetailsApi(id);
      return serializeEmployeeDetailsResponse(res);
    },
    staleTime: Infinity,
  });
}

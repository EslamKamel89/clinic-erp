import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { BackendPaginationRawResponse } from "@/shared/lib/pagination/types";
import type { EmployeeRaw } from "../types/employee.types";

export async function employeeIndexApi(
  page: number,
  limit: number,
): Promise<BackendPaginationRawResponse<EmployeeRaw>> {
  try {
    const response = await apiClient.get<
      BackendPaginationRawResponse<EmployeeRaw>
    >(API_ENDPOINTS.employeesIndex, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

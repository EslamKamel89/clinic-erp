import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { EmployeePayload } from "../types/employeeRequest.types";

export async function employeeCreateApi(
  payload: EmployeePayload,
): Promise<ApiResponse<null>> {
  try {
    const res = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.employeeCreate,
      payload,
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

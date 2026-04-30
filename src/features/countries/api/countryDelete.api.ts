import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";

export async function deleteCountryApi(id: number): Promise<ApiResponse<null>> {
  try {
    const res = await apiClient.delete<ApiResponse<null>>(
      API_ENDPOINTS.countryDelete(id),
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

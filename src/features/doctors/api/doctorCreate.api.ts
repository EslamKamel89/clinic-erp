import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import type { ApiResponse } from "@/shared/lib/api/types";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { DoctorPayload } from "../types/doctorRequest.types";

export async function doctorCreateApi(
  payload: DoctorPayload,
): Promise<ApiResponse<null>> {
  try {
    const res = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.doctorCreate,
      payload,
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

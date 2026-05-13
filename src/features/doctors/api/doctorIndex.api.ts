import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { BackendPaginationRawResponse } from "@/shared/lib/pagination/types";
import type { DoctorRaw } from "../types/doctor.types";

export async function doctorIndexApi(
  page: number,
  limit: number,
): Promise<BackendPaginationRawResponse<DoctorRaw>> {
  try {
    const response = await apiClient.get<
      BackendPaginationRawResponse<DoctorRaw>
    >(API_ENDPOINTS.doctorsIndex, {
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

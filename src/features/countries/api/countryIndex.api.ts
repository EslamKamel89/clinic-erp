import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { BackendPaginationRawResponse } from "../../../shared/lib/pagination/types";
import type { CountryRaw } from "../types/country.types";

export async function countryIndexApi(
  page: number,
  limit: number,
): Promise<BackendPaginationRawResponse<CountryRaw>> {
  try {
    const response = await apiClient.get<
      BackendPaginationRawResponse<CountryRaw>
    >(API_ENDPOINTS.countryIndex, { params: { page, limit } });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { CountryRaw } from "../types/country.types";

type UpdateCountryPayload = Omit<CountryRaw, "ID">;

export async function updateCountryApi(
  id: number,
  payload: UpdateCountryPayload,
): Promise<ApiResponse<CountryRaw>> {
  try {
    const res = await apiClient.put<ApiResponse<CountryRaw>>(
      API_ENDPOINTS.countryUpdate(id),
      payload,
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { CountryRaw } from "../types/country.types";

type CreateCountryPayload = Omit<CountryRaw, "ID">;

export async function createCountryApi(
  payload: CreateCountryPayload,
): Promise<ApiResponse<CountryRaw>> {
  try {
    const res = await apiClient.post<ApiResponse<CountryRaw>>(
      API_ENDPOINTS.countryCreate,
      payload,
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

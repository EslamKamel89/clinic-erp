import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { StatesResponse } from "../types/location.types";

export async function statesApi(countryId: number): Promise<StatesResponse> {
  try {
    const res = await apiClient.get<StatesResponse>(API_ENDPOINTS.states, {
      params: {
        country: countryId,
      },
    });
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

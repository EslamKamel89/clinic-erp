import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { CitiesResponse } from "../types/location.types";

export async function citiesApi(stateId: number): Promise<CitiesResponse> {
  try {
    const res = await apiClient.get<CitiesResponse>(API_ENDPOINTS.cities, {
      params: {
        state: stateId,
      },
    });
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

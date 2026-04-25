import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { LoginResponseRaw } from "../types/auth.types";

export async function meApi(): Promise<LoginResponseRaw> {
  try {
    const response = await apiClient.get<LoginResponseRaw>(API_ENDPOINTS.me);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

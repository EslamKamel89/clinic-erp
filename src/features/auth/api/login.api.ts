import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { LoginResponseRaw } from "../types/auth.types";
export async function loginApi(
  username: string,
  password: string,
): Promise<LoginResponseRaw> {
  try {
    const response = await apiClient.post<LoginResponseRaw>(
      API_ENDPOINTS.login,
      {
        username,
        password,
      },
    );
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

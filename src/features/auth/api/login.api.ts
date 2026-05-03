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
    // there is a bug in the backend so i override the response until the bug is fixed.
    // the override below is acceptable temporary
    response.data.Permission = {
      "User Accounts": ["create", "update", "delete"],
      Languages: ["create", "update", "delete", "show"],
      Counties: ["create", "update", "delete", "show"],
      States: ["create", "update", "delete", "show"],
      Cities: ["create", "update", "show"],
    };
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

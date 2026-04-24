import axios from "axios";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_BASE_URL, API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { LoginResponseRaw } from "../types/auth.types";
export async function loginApi(
  username: string,
  password: string,
): Promise<LoginResponseRaw> {
  try {
    const response = await axios.post<LoginResponseRaw>(
      `${API_BASE_URL}${API_ENDPOINTS.login}`,
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

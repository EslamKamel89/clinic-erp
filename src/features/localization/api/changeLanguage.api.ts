import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import type { Language } from "../../auth/types/auth.types";
export async function changeLanguageApi(lang: Language): Promise<void> {
  try {
    await apiClient.post(API_ENDPOINTS.changeLanguage, {
      name: lang,
    });
  } catch (error) {
    throw normalizeApiError(error);
  }
}

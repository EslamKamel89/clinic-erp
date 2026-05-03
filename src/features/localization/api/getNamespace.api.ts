import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import { sleep } from "../../../shared/lib/helpers/sleep";
import type { RawLocalizationItem } from "../types/localization.types";

const USE_DUMMY = true;
export async function getNamespaceApi(
  namespace: string,
  language: string,
): Promise<Record<string, string>> {
  let raw: RawLocalizationItem[];
  if (USE_DUMMY) {
    await sleep(2);
    raw = dummyBackendResponse(namespace, language);
  } else {
    const response = await realBackendResponse(namespace);
    raw = response.data;
  }
  const result: Record<string, string> = {};
  for (const item of raw) {
    result[item.key] = item.label;
  }
  return result;
}

function dummyBackendResponse(
  namespace: string,
  language: string,
): RawLocalizationItem[] {
  const localizationData = {
    p002: {
      en: [
        { key: "countries.title", label: "Countries" },
        { key: "countries.add", label: "Add Country" },
        { key: "countries.loading", label: "Loading countries..." },
      ],
      ar: [
        { key: "countries.title", label: "الدول" },
        { key: "countries.add", label: "إضافة دولة" },
        { key: "countries.loading", label: "جاري تحميل الدول..." },
      ],
    },
  };
  const namespaceData =
    localizationData[namespace as keyof typeof localizationData];
  if (!namespaceData) return [];
  const langData = namespaceData[language as keyof typeof namespaceData];
  if (!langData) return [];
  return langData;
}

// the backend now the language from the user token because the user selected languages is saved in the backend database
async function realBackendResponse(
  namespace: string,
): Promise<ApiResponse<RawLocalizationItem[]>> {
  const page = Number(namespace.replace("p", ""));
  try {
    const response = await apiClient.get<ApiResponse<RawLocalizationItem[]>>(
      API_ENDPOINTS.translations,
      { params: { page } },
    );
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

import { apiClient } from "../../../shared/lib/api/client";
import { normalizeApiError } from "../../../shared/lib/api/error";
import { API_ENDPOINTS } from "../../../shared/lib/config/api";
import { sleep } from "../../../shared/lib/helpers/sleep";
import type { RawLocalizationItem } from "../types/localization.types";
import { dummyBackendResponse } from "./dummyBackendResponse";

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
    raw = await realBackendResponse(namespace);
  }
  const result: Record<string, string> = {};
  for (const item of raw) {
    result[item.key] = item.label;
  }
  return result;
}

// the backend now the language from the user token because the user selected languages is saved in the backend database
async function realBackendResponse(
  namespace: string,
): Promise<RawLocalizationItem[]> {
  let page = Number(namespace.replace("p", ""));
  const pageMap: Record<number, number> = {
    2: 3,
  };
  if (page in pageMap) {
    page = pageMap[page];
  }
  try {
    const response = await apiClient.get(API_ENDPOINTS.translations, {
      params: { p: page },
    });
    return response.data.translations as RawLocalizationItem[];
  } catch (error) {
    throw normalizeApiError(error);
  }
}

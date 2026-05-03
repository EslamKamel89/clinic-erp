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
    await sleep(1);
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
        // page
        { key: "title", label: "Countries" },
        { key: "subtitle", label: "Manage and view available countries" },
        { key: "add", label: "Add Country" },

        // states
        { key: "loading", label: "Loading countries..." },
        { key: "error", label: "Failed to load countries" },
        { key: "retry", label: "Retry" },
        { key: "empty", label: "No countries found" },

        // table
        { key: "name", label: "Name" },
        { key: "phone_code", label: "Phone Code" },
        { key: "notes", label: "Notes" },

        // form
        { key: "name_placeholder", label: "Country Name" },
        { key: "phone_placeholder", label: "+20" },
        { key: "notes_placeholder", label: "Optional notes" },
        { key: "save", label: "Save" },
        { key: "saving", label: "Saving..." },

        // sheets
        { key: "create_title", label: "Create Country" },
        { key: "edit_title", label: "Edit Country" },

        // delete
        { key: "delete_title", label: "Delete Country" },
        {
          key: "delete_confirm",
          label:
            "Are you sure you want to delete? This action cannot be undone.",
        },
        { key: "delete", label: "Delete" },
        { key: "deleting", label: "Deleting..." },
        { key: "cancel", label: "Cancel" },

        // toast
        { key: "created", label: "Country created" },
        { key: "create_failed", label: "Failed to create country" },
        { key: "updated", label: "Country updated" },
        { key: "update_failed", label: "Failed to update country" },
        { key: "deleted", label: "Country deleted" },
        { key: "delete_failed", label: "Failed to delete country" },
      ],

      ar: [
        // page
        { key: "title", label: "الدول" },
        { key: "subtitle", label: "إدارة وعرض الدول المتاحة" },
        { key: "add", label: "إضافة دولة" },

        // states
        { key: "loading", label: "جاري تحميل الدول..." },
        { key: "error", label: "فشل في تحميل الدول" },
        { key: "retry", label: "إعادة المحاولة" },
        { key: "empty", label: "لا توجد دول" },

        // table
        { key: "name", label: "الاسم" },
        { key: "phone_code", label: "كود الهاتف" },
        { key: "notes", label: "ملاحظات" },

        // form
        { key: "name_placeholder", label: "اسم الدولة" },
        { key: "phone_placeholder", label: "+20" },
        { key: "notes_placeholder", label: "ملاحظات اختيارية" },
        { key: "save", label: "حفظ" },
        { key: "saving", label: "جاري الحفظ..." },

        // sheets
        { key: "create_title", label: "إضافة دولة" },
        { key: "edit_title", label: "تعديل الدولة" },

        // delete
        { key: "delete_title", label: "حذف الدولة" },
        {
          key: "delete_confirm",
          label: "هل أنت متأكد من حذف ؟ لا يمكن التراجع عن هذا الإجراء.",
        },
        { key: "delete", label: "حذف" },
        { key: "deleting", label: "جاري الحذف..." },
        { key: "cancel", label: "إلغاء" },

        // toast
        { key: "created", label: "تم إنشاء الدولة بنجاح" },
        { key: "create_failed", label: "فشل في إنشاء الدولة" },
        { key: "updated", label: "تم تحديث الدولة بنجاح" },
        { key: "update_failed", label: "فشل في تحديث الدولة" },
        { key: "deleted", label: "تم حذف الدولة بنجاح" },
        { key: "delete_failed", label: "فشل في حذف الدولة" },
      ],
    },
  };
  const namespaceData =
    localizationData[namespace as keyof typeof localizationData];
  if (!namespaceData) {
    console.warn(`[i18n] Missing namespace in dummy: ${namespace}`);
    return [];
  }
  const langData = namespaceData[language as keyof typeof namespaceData];
  if (!langData) {
    console.warn(
      `[i18n] Missing language "${language}" in namespace "${namespace}"`,
    );
    return [];
  }
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

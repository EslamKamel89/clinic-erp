import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadNamespace } from "./runtime/loadNamespace";
type Namespace = "p000" | "p001";

export function useLocalization(pageId: Namespace) {
  const { t: originalT, i18n } = useTranslation(pageId, { useSuspense: false });

  const language = i18n.language;

  function t(key: string) {
    const result = originalT(key, {
      ns: pageId,
    });
    if (result === key) {
      console.warn(
        `[i18n] Missing key "${key}" in namespace "${pageId}" and fallback`,
      );
    }
    return result;
  }

  useEffect(() => {
    if (pageId != "p000") {
      loadNamespace(pageId);
    }
  }, [pageId, language]);
  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
    i18n,
  };
}

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNamespace } from "./hooks/useNamespace";
type Namespace = "p000" | "p001" | "validation";

export function useLocalization(pageId: Namespace) {
  const { t: originalT, i18n } = useTranslation(pageId, { useSuspense: false });
  const staticNamespaces = ["p000", "validation"];
  const shouldFetch = !staticNamespaces.includes(pageId);
  const { data, isLoading } = useNamespace(pageId, {
    enabled: shouldFetch,
  });
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
    if (!shouldFetch || !data) return;

    i18n.addResourceBundle(language, pageId, { ...data }, true, true);
  }, [data, language, pageId, shouldFetch]);
  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
    i18n,
    isLoading: shouldFetch ? isLoading : false,
  };
}

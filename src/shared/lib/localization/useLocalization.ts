import { useTranslation } from "react-i18next";
type Namespace = "p000" | "p001";

export function useLocalization(pageId: Namespace) {
  const { t: originalT, i18n } = useTranslation();
  const language = i18n.language;
  function t(key: string) {
    const result = originalT(key, {
      ns: [pageId, "p000"],
    });
    if (result === key) {
      console.warn(
        `[i18n] Missing key "${key}" in namespace "${pageId}" and fallback`,
      );
    }
    return result;
  }
  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
  };
}

import { useTranslation } from "react-i18next";
type Namespace = "p000" | "p001";

export function useLocalization(pageId: Namespace) {
  const { t: originalT, i18n } = useTranslation();
  const language = i18n.language;
  function t(key: string) {
    return originalT(key, {
      ns: [pageId, "p000"],
    });
  }
  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
  };
}

import { useTranslation } from "react-i18next";

export function useLocalization() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
  };
}

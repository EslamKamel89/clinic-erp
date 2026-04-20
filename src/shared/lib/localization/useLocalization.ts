import { useTranslation } from "react-i18next";

export function useLocalization() {
  const { t, i18n } = useTranslation();
  return {
    t,
    language: i18n.language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
  };
}

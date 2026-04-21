import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enP000 from "./resources/en/p000.json";
import enP001 from "./resources/en/p001.json";

import arP000 from "./resources/ar/p000.json";
import arP001 from "./resources/ar/p001.json";
i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["p000", "p001"],
  // i can't use the default namespace to be for example p001 because if i am on another page for example p012 and i forget to add the right namespace i want it to fail not to try to find localization values from other pages
  defaultNS: "p000",
  fallbackNS: "p000",
  resources: {
    en: {
      p000: enP000,
      p001: enP001,
    },
    ar: {
      p000: arP000,
      p001: arP001,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;

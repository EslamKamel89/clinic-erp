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
  // i made the defaultNs p0000 because this is namespace will contain shared keys. but i can't use any other namespace because it's page scope and this will cause issues if i forget to identify namespace and by mistake i get the data from another namespace.
  defaultNS: "p000",
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

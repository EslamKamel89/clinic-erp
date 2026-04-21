import { useEffect } from "react";
import { getDirection } from "./getDirection";
import i18n from "./i18n";

export default function useLocalizationInit() {
  useEffect(() => {
    const update = () => {
      const language = i18n.language;
      const direction = getDirection(language);
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
      // loadedNamespaces.clear();
    };
    update();
    i18n.on("languageChanged", update);
    return () => {
      i18n.off("languageChanged", update);
    };
  }, []);
}

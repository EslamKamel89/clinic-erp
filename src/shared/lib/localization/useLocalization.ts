import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNamespace } from "./hooks/useNamespace";

type Namespace = "p000" | "p001" | "validation" | "p002";

export function useLocalization(pageId: Namespace) {
  const { t: originalT, i18n } = useTranslation(pageId, {
    useSuspense: false,
  });

  const staticNamespaces = ["p000", "validation"];
  const shouldFetch = !staticNamespaces.includes(pageId);

  const { data, isLoading } = useNamespace(pageId, {
    enabled: shouldFetch,
  });

  const language = i18n.language;

  // this state is ONLY updated via i18n events
  const [, setVersion] = useState(0);

  function t(key: string, options?: Record<string, unknown>) {
    const result = originalT(key, {
      ns: pageId,
      ...options,
    });

    if (result === key) {
      return ".....";
    }

    return result;
  }

  useEffect(() => {
    if (!shouldFetch || !data) return;

    const alreadyLoaded = i18n.hasResourceBundle(language, pageId);
    if (alreadyLoaded) return;

    if (Object.keys(data).length === 0) {
      console.warn(`[i18n] Empty namespace loaded: ${pageId}`);
      return;
    }

    i18n.addResourceBundle(language, pageId, data, true, true);

    i18n.emit("loaded", { lng: language, ns: pageId });
  }, [data, language, pageId, shouldFetch, i18n]);

  // Subscribe to i18n updates
  useEffect(() => {
    const rerender = () => setVersion((v) => v + 1);

    i18n.on("languageChanged", rerender);
    i18n.on("loaded", rerender);

    return () => {
      i18n.off("languageChanged", rerender);
      i18n.off("loaded", rerender);
    };
  }, [i18n]);

  return {
    t,
    language,
    setLanguage: (lng: string) => i18n.changeLanguage(lng),
    i18n,
    isLoading: shouldFetch ? isLoading : false,
  };
}

import { sleep } from "../../helpers/sleep";
import i18n from "../i18n";

export const loadedNamespaces = new Set<string>();
function buildKey(language: string, namespace: string) {
  return `${language}:${namespace}`;
}
export async function loadNamespace(namespace: string) {
  const language = i18n.language;
  const cacheKey = buildKey(language, namespace);

  if (loadedNamespaces.has(cacheKey)) return;
  try {
    const page = namespace.replace("p", "");
    // the backend is not implemented yet so this will be implemented later for now i will return a dummy response
    // const response = await fetch(
    //   `http://behaaasamir-001-site1.mtempurl.com/api/translations?page=${Number(page)}`,
    // );

    // const data = await response.json();
    await sleep(2);
    const data = {
      click: "Click Me!!!!",
    };
    i18n.addResourceBundle(language, namespace, data, true, true);
    i18n.changeLanguage(language);
    loadedNamespaces.add(cacheKey);
  } catch (error) {
    console.error("[i18n] Failed to load namespace:", namespace, error);
  }
}

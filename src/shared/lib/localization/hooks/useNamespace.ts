import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getNamespaceApi } from "../../../../features/localization/api/getNamespace.api";
import { queryClientKeys } from "../../query/keys";

export function useNamespace(namespace: string) {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const query = useQuery({
    queryKey: queryClientKeys.localization.namespace(language, namespace),
    queryFn: () => getNamespaceApi(namespace, language),
    staleTime: Infinity,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

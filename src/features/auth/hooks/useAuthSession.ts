import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import i18n from "../../../shared/lib/localization/i18n";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { meApi } from "../api/me.api";
import { serializeLoginResponse } from "../api/serializers/login.serializer";
import { useAuthStore } from "../store/auth.store";

export const useAuthSession = () => {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();
  const setToken = useAuthStore((s) => s.setToken);

  const query = useQuery({
    queryKey: queryClientKeys.auth.session,
    enabled: !!token,
    queryFn: async () => {
      const response = await meApi();
      return serializeLoginResponse(response);
    },
    retry: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!query.isSuccess) return;
    if (query.data.token !== token) {
      setToken(query.data.token);
    }
    queryClient.setQueryData(queryClientKeys.auth.user, query.data.user);
    queryClient.setQueryData(queryClientKeys.auth.menu, query.data.menu);
    queryClient.setQueryData(
      queryClientKeys.auth.permissions,
      query.data.permissions,
    );
    if (i18n.language !== query.data.language) {
      i18n.changeLanguage(query.data.language);
    }
  }, [
    query.isSuccess,
    queryClient,
    query.data?.menu,
    query.data?.user,
    query.data?.language,
    query.data?.permissions,
    query.data?.token,
    setToken,
  ]);
  useEffect(() => {
    if (query.isError) {
      setToken(null);
    }
  }, [query.isError, setToken]);
  return query;
};

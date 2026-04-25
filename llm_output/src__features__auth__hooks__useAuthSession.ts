import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import i18n from "../../../shared/lib/localization/i18n";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { meApi } from "../api/me.api";
import { serializeLoginResponse } from "../api/serializers/login.serializer";
import { useAuthStore } from "../store/auth.store";
import type { MenuItem, User } from "../types/auth.types";

export const useAuthSession = () => {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();
  const existingUser = queryClient.getQueryData<User>(
    queryClientKeys.auth.user,
  );

  const existingMenu = queryClient.getQueryData<MenuItem[]>(
    queryClientKeys.auth.menu,
  );
  const setToken = useAuthStore((s) => s.setToken);
  const query = useQuery({
    queryKey: queryClientKeys.auth.session,
    enabled: !!token && !existingUser && !existingMenu,
    queryFn: async () => {
      const response = await meApi();
      return serializeLoginResponse(response);
    },
    retry: false,
  });
  useEffect(() => {
    if (!query.isSuccess) return;
    queryClient.setQueryData(queryClientKeys.auth.user, query.data.user);
    queryClient.setQueryData(queryClientKeys.auth.menu, query.data.menu);
    if (i18n.language !== query.data.language) {
      i18n.changeLanguage(query.data.language);
    }
  }, [
    query.isSuccess,
    queryClient,
    query.data?.menu,
    query.data?.user,
    query.data?.language,
  ]);
  useEffect(() => {
    if (query.isError) {
      setToken(null);
    }
  }, [query.isError, setToken]);
  return query;
};

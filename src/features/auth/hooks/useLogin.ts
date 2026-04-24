import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppError } from "../../../shared/lib/api/error";
import i18n from "../../../shared/lib/localization/i18n";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { loginApi } from "../api/login.api";
import { serializeLoginResponse } from "../api/serializers/login.serializer";
import { useAuthStore } from "../store/auth.store";
import type { AuthModel } from "../types/auth.types";

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const queryClient = useQueryClient();
  return useMutation<
    AuthModel,
    AppError,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      const response = await loginApi(username, password);
      return serializeLoginResponse(response);
    },
    onSuccess: (data) => {
      setToken(data.token);
      // for now i will only make the language english later this will be changed because the backend always return 'ar' due to an issue that will be fixed later by the backend team.
      // i18n.changeLanguage(data.language);
      i18n.changeLanguage("en");
      queryClient.setQueryData(queryClientKeys.auth.user, data.user);
      queryClient.setQueryData(queryClientKeys.auth.menu, data.menu);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import i18n from "../../../shared/lib/localization/i18n";
import { loginApi } from "../api/login.api";
import { serializeLoginResponse } from "../api/serializers/login.serializer";
import { useAuthStore } from "../store/auth.store";

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await loginApi(username, password);
      return serializeLoginResponse(response);
    },
    onSuccess: (data) => {
      setToken(data.token);
      i18n.changeLanguage(data.language);
    },
  });
}

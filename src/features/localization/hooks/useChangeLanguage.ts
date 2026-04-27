import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "../../../shared/lib/localization/i18n";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { useAuthStore } from "../../auth/store/auth.store";
import type { Language } from "../../auth/types/auth.types";
import { changeLanguageApi } from "../api/changeLanguageApi";

export const useChangeLanguage = () => {
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation({
    mutationFn: changeLanguageApi,
  });
  const queryClient = useQueryClient();
  const changeLanguage = async (language: Language) => {
    if (i18n.language === language || mutation.isPending) return;
    const isAuthenticated = !!token;
    if (isAuthenticated) {
      await mutation.mutateAsync(language);
      await queryClient.refetchQueries({
        queryKey: queryClientKeys.auth.session,
      });
    }
    await i18n.changeLanguage(language);
    navigate({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    });
  };
  return {
    changeLanguage,
    isLoading: mutation.isPending,
  };
};

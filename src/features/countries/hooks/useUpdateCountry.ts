import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/lib/toast/toast";
import { updateCountryApi } from "../api/countryUpdate.api";
import type { CountryRaw } from "../types/country.types";

type UpdateCountryPayload = Omit<CountryRaw, "ID">;

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  const { t } = useLocalization("p002");

  return useMutation<
    ApiResponse<CountryRaw>,
    AppError,
    { id: number; payload: UpdateCountryPayload }
  >({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCountryPayload;
    }) => updateCountryApi(id, payload),
    onSuccess: (data) => {
      showSuccessToast(t("updated"), {
        description: data.Message,
      });
      queryClient.invalidateQueries({
        queryKey: queryClientKeys.countries.main,
      });
    },
    onError: (error: AppError) => {
      showErrorToast(t("update_failed"), {
        description: error.message,
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/lib/toast/toast";
import { createCountryApi } from "../api/countryCreate.api";
import type { CountryRaw } from "../types/country.types";

type CreateCountryPayload = Omit<CountryRaw, "ID">;

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<CountryRaw>, AppError, CreateCountryPayload>({
    mutationFn: (payload: CreateCountryPayload) => createCountryApi(payload),
    onSuccess: (data) => {
      showSuccessToast("Country created", {
        description: data.Message,
      });
      queryClient.invalidateQueries({
        queryKey: queryClientKeys.countries.main,
      });
    },
    onError: (error) => {
      showErrorToast("Failed to create country", {
        description: error.message,
      });
    },
  });
};

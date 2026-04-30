import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppError } from "../../../shared/lib/api/error";
import type { ApiResponse } from "../../../shared/lib/api/types";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/lib/toast/toast";
import { deleteCountryApi } from "../api/countryDelete.api";

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, AppError, number>({
    mutationFn: (id: number) => deleteCountryApi(id),
    onSuccess: (data) => {
      showSuccessToast("Country deleted", {
        description: data.Message,
      });
      queryClient.invalidateQueries({
        queryKey: queryClientKeys.countries.main,
      });
    },
    onError: (error: AppError) => {
      showErrorToast("Failed to delete country", {
        description: error.message,
      });
    },
  });
};

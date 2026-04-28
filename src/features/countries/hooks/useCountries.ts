import { useQuery } from "@tanstack/react-query";
import type { AppError } from "../../../shared/lib/api/error";
import { transformPagination } from "../../../shared/lib/pagination/transformPagination";
import type { PaginatedResponse } from "../../../shared/lib/pagination/types";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { countryIndexApi } from "../api/countryIndex.api";
import { serializeCountryIndexResponse } from "../serializers/countryIndex.serializer";
import type { Country } from "../types/country.types";

type Params = {
  page: number;
  limit: number;
};

export const useCountries = ({ page, limit }: Params) => {
  const { data, isLoading, isError } = useQuery<
    PaginatedResponse<Country>,
    AppError
  >({
    queryKey: queryClientKeys.countries.index(page, limit),
    queryFn: async () => {
      const response = await countryIndexApi(page, limit);
      const data = serializeCountryIndexResponse(response.data);
      const pagination = transformPagination<Country>({ ...response, data });
      return pagination;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};

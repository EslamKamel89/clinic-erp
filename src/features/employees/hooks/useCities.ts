import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { citiesApi } from "../api/cities.api";

export function useCities(stateId: number | null) {
  return useQuery({
    queryKey: queryClientKeys.dropdownData.cities(stateId ?? 0),
    enabled: !!stateId,
    queryFn: async () => {
      const res = await citiesApi(stateId ?? 0);
      return res.Cities;
    },
    staleTime: Infinity,
  });
}

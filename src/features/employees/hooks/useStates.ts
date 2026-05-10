import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { statesApi } from "../api/states.api";

export function useStates(countryId: number | null) {
  return useQuery({
    queryKey: queryClientKeys.dropdownData.states(countryId ?? 0),
    enabled: !!countryId,
    queryFn: async () => {
      const res = await statesApi(countryId ?? 0);
      return res.States;
    },
    staleTime: Infinity,
  });
}

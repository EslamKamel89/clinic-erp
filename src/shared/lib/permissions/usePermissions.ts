import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Action,
  Permissions,
} from "../../../features/auth/types/auth.types";
import { queryClientKeys } from "../query/keys";
import { can as baseCan } from "./can";

export function usePermissions() {
  const queryClient = useQueryClient();

  const { data: permissions } = useQuery<Permissions | null>({
    queryKey: queryClientKeys.auth.permissions,
    queryFn: async () => {
      return queryClient.getQueryData(queryClientKeys.auth.permissions) ?? null;
    },
    initialData: () =>
      queryClient.getQueryData(queryClientKeys.auth.permissions) ?? null,
    staleTime: Infinity,
  });

  function can(resource: keyof Permissions, action: Action) {
    return baseCan(permissions, resource, action);
  }

  return {
    permissions,
    can,
  };
}

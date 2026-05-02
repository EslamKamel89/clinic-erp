import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Action,
  Permissions,
} from "../../../features/auth/types/auth.types";
import { queryClientKeys } from "../query/keys";

import { can as baseCan } from "./can";
export function usePermissions() {
  const cachedPermissions = useQueryClient().getQueryData<
    Permissions | undefined
  >(queryClientKeys.auth.permissions);
  const { data: permissions } = useQuery({
    queryKey: queryClientKeys.auth.permissions,
    queryFn: () => cachedPermissions,
    initialData: () => cachedPermissions,
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

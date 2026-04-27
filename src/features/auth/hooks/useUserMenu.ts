import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import type { MenuItem } from "../types/auth.types";

export const useUserMenu = () => {
  const queryClient = useQueryClient();
  const menu = queryClient.getQueryData<MenuItem[]>(queryClientKeys.auth.menu);
  return menu ?? [];
};

import { Navigate, Outlet } from "react-router-dom";
import type {
  Action,
  Permissions,
} from "../../../features/auth/types/auth.types";
import { usePermissions } from "../../../shared/lib/permissions/usePermissions";

type Props = {
  resource: keyof Permissions;
  action: Action;
};

export const RequirePermission = ({ resource, action }: Props) => {
  const { can } = usePermissions();
  if (!can(resource, action)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

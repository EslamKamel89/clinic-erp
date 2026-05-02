import type {
  Action,
  Permissions,
} from "../../../features/auth/types/auth.types";

export function can(
  permissions: Permissions | undefined | null,
  resource: keyof Permissions,
  action: Action,
) {
  if (!permissions) return false;
  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;
  return resourcePermissions.includes(action);
}

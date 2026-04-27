// src/app/router/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuthSession } from "../../../features/auth/hooks/useAuthSession";
import { useLogout } from "../../../features/auth/hooks/useLogout";
import { useUserMenu } from "../../../features/auth/hooks/useUserMenu";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { ActionMenu } from "../../../features/navigation/components/ActionMenu";
import { MenuItemParent } from "../../../features/navigation/components/MenuItemNode";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
export const AppLayout = () => {
  const { logout } = useLogout();
  const { t } = useLocalization("p000");
  const menus = useUserMenu();
  const token = useAuthStore((s) => s.token);
  const session = useAuthSession();

  const isHydrating = !!token && session.isLoading;

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          {/* Spinner */}
          <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />

          {/* Text */}
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-14 max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="">
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold tracking-tight">
                {t("system.app_title")}
              </span>

              <div className="flex space-x-2">
                {menus.map((m) => (
                  <MenuItemParent item={m} key={"MenuItemParent." + m.label} />
                ))}
              </div>
            </div>
          </div>

          <ActionMenu t={t} logoutCallback={logout} />
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("system.app_title")}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{t("system.copyright")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

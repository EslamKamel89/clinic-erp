// src/app/router/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuthSession } from "../../../features/auth/hooks/useAuthSession";
import { useLogout } from "../../../features/auth/hooks/useLogout";
import { useUserMenu } from "../../../features/auth/hooks/useUserMenu";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { ActionMenu } from "../../../features/navigation/components/ActionMenu";
import { DesktopMenu } from "../../../features/navigation/components/DesktopMenu";
import { MobileMenu } from "../../../features/navigation/components/MobileMenu";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { usePermissions } from "../../../shared/lib/permissions/usePermissions";

export const AppLayout = () => {
  const { logout } = useLogout();
  const { t } = useLocalization("p000");
  const menus = useUserMenu();
  const token = useAuthStore((s) => s.token);
  const session = useAuthSession();
  const { permissions } = usePermissions();
  const isHydrating = !!token && session.isLoading;
  if (isHydrating || !permissions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-7 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg">
        <div className="h-14 max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <MobileMenu menus={menus} />

            {/* App Title */}
            <span className="text-sm md:text-base font-bold tracking-tight whitespace-nowrap">
              {t("system.app_title")}
            </span>

            {/* Divider */}
            <div className="hidden md:block h-5 w-px bg-border/60 mx-2" />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              <DesktopMenu menus={menus} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block h-5 w-px bg-border/60 mx-2" />
            <ActionMenu t={t} logoutCallback={logout} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-xl border bg-card p-4 md:p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium">{t("system.app_title")}</span>
          </p>

          <span className="opacity-80">{t("system.copyright")}</span>
        </div>
      </footer>
    </div>
  );
};

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
          <div className="size-8 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary shadow-sm" />

          <div className="space-y-1 text-center">
            <p className="text-sm font-medium text-foreground">
              Loading workspace
            </p>

            <p className="text-xs text-muted-foreground">
              Preparing your session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="h-16 max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <MobileMenu menus={menus} />

            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <span className="text-sm font-bold">C</span>
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-base font-semibold tracking-tight">
                  {t("system.app_title")}
                </span>

                <span className="hidden md:block text-xs text-muted-foreground">
                  Clinic Management Platform
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-6 w-px bg-border/70 mx-1" />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <DesktopMenu menus={menus} />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block h-6 w-px bg-border/70" />

            <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm px-1 py-1 shadow-sm">
              <ActionMenu t={t} logoutCallback={logout} />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
            {/* Decorative Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/20" />

            {/* Content */}
            <div className="relative p-4 md:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-foreground">
                {t("system.app_title")}
              </span>
            </p>

            <span className="text-[11px] text-muted-foreground/80">
              Modern ERP experience for clinics and healthcare operations
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <div className="size-2 rounded-full bg-primary animate-pulse" />

            <span>{t("system.copyright")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

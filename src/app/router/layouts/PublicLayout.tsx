// src/app/router/layouts/PublicLayout.tsx

import { Outlet } from "react-router-dom";

import { Separator } from "../../../components/ui/separator";

import { LanguageSwitcher } from "../../../features/localization/components/LanguageSwitcher";

import { useLocalization } from "../../../shared/lib/localization/useLocalization";

export const PublicLayout = () => {
  const { t } = useLocalization("p000");

  return (
    <div
      className="
        relative flex min-h-screen flex-col overflow-hidden
        bg-gradient-to-br
        from-background
        via-background
        to-accent/20
      "
    >
      {/* Ambient Background Glow */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_top_left,theme(colors.primary/.08),transparent_30%),radial-gradient(circle_at_bottom_right,theme(colors.accent/.18),transparent_35%)]
        "
      />

      {/* Header */}
      <header
        className="
          sticky top-0 z-40
          border-b border-border/60
          bg-background/70
          backdrop-blur-xl
        "
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="
                flex size-10 items-center justify-center
                rounded-2xl
                bg-primary
                text-primary-foreground
                shadow-sm
              "
            >
              <span className="text-sm font-bold">C</span>
            </div>

            {/* Title */}
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight md:text-base">
                {t("system.app_title")}
              </span>

              <span className="hidden text-xs text-muted-foreground md:block">
                Clinic Management Platform
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Separator orientation="vertical" className="hidden h-6 md:block" />

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Auth Surface */}
          <div
            className="
              relative overflow-hidden rounded-3xl
              border border-border/60
              bg-card/80
              shadow-xl
              backdrop-blur-xl
            "
          >
            {/* Decorative Gradient */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-br
                from-primary/5
                via-transparent
                to-accent/20
              "
            />

            {/* Content */}
            <div className="relative p-6 md:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="
          border-t border-border/60
          bg-background/60
          backdrop-blur-sm
        "
      >
        <div
          className="
            mx-auto flex max-w-7xl flex-col items-center justify-between gap-2
            px-4 py-5
            text-center
            md:flex-row
          "
        >
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">
                {t("system.app_title")}
              </span>
            </p>

            <span className="text-[11px] text-muted-foreground/80">
              Secure healthcare management experience
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

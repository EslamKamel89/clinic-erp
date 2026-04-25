// src/app/router/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import { Separator } from "../../../components/ui/separator";
import { LanguageSwitcher } from "../../../features/localization/components/LanguageSwitcher";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";

export const PublicLayout = () => {
  const { t } = useLocalization("p000");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm font-semibold tracking-tight">
            {t("system.app_title")}
          </div>

          <div className="flex items-center gap-3">
            <Separator orientation="vertical" className="h-5" />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("system.app_title")}
          </p>
        </div>
      </footer>
    </div>
  );
};

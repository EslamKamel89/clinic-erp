import { Outlet } from "react-router-dom";
import { useAuthSession } from "../../../features/auth/hooks/useAuthSession";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import useLocalizationInit from "../../../shared/lib/localization/initLocalization";

export const RootLayout = () => {
  useLocalizationInit();

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

  return <Outlet />;
};

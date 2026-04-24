import { Outlet } from "react-router-dom";
import { useLogout } from "../../../features/auth/hooks/useLogout";

export const AppLayout = () => {
  const { logout } = useLogout();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header (Menu Placeholder) */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-14 max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left: Logo / App Name */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              Clinic ERP
            </span>
          </div>

          {/* Right: Menu Placeholder */}
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="text-sm text-muted-foreground px-3 py-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto w-full max-w-7xl space-y-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Clinic ERP
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

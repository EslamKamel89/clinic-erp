import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header (Menu Placeholder) */}
      <header className="h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left: Logo / App Name */}
          <div className="text-sm font-medium tracking-tight">Clinic ERP</div>

          {/* Right: Menu Placeholder */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {/* Menu will be implemented later */}
            Menu
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Clinic ERP
          </p>

          <div className="text-xs text-muted-foreground">
            All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

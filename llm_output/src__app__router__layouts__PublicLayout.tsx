import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm font-medium tracking-tight">Clinic ERP</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t bg-background">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Clinic ERP
          </p>
        </div>
      </footer>
    </div>
  );
};

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import type { MenuItem } from "../../auth/types/auth.types";
import { MenuItemNodeMobile } from "./MenuItemNodeMobile";

type Props = {
  menus: MenuItem[];
};

export const MobileMenu = ({ menus }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="rounded-xl border border-border/60 bg-card/60 shadow-sm backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[320px] border-r border-border/60 bg-background/95 p-0 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="border-b border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/20 px-6 py-5">
            <SheetHeader className="space-y-1 text-left">
              <SheetTitle className="text-base font-semibold tracking-tight">
                Navigation
              </SheetTitle>

              <SheetDescription className="text-xs text-muted-foreground">
                Browse application modules and sections
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-1 px-3 py-4">
            {menus.map((item) => (
              <MenuItemNodeMobile
                key={item.path ?? item.label}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

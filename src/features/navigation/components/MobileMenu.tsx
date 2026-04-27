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
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-base font-semibold">
              Navigation
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Browse application menu
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-1">
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

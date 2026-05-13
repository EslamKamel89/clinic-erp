import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import i18n from "../../../shared/lib/localization/i18n";

import type { MenuItem } from "../../auth/types/auth.types";

type Props = {
  item: MenuItem;
};

export const MenuItemParentDesktop = ({ item }: Props) => {
  return (
    <DropdownMenu dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <button
          className="
            group relative overflow-hidden rounded-xl
            px-4 py-2
            text-sm font-medium
            text-foreground/80
            transition-all duration-200

            hover:bg-accent/70
            hover:text-foreground

            data-[state=open]:bg-primary
            data-[state=open]:text-primary-foreground
            data-[state=open]:shadow-sm
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="relative">{item.label}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="
          min-w-[240px]
          rounded-2xl
          border border-border/60
          bg-popover/95
          p-2
          shadow-xl
          backdrop-blur-xl
        "
      >
        <div className="space-y-1">
          {item.children?.map((child) => (
            <MenuItemNodeDesktop key={child.label} item={child} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MenuItemNodeDesktop = ({ item }: Props) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <DropdownMenuItem
        asChild
        className="
          rounded-xl
          px-3 py-2.5
          text-sm
          text-muted-foreground
          transition-all duration-150

          hover:bg-accent/70
          hover:text-foreground

          focus:bg-accent/70
          focus:text-foreground
        "
      >
        <Link to={item.path || "#"} className="w-full">
          {item.label}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className="
          group rounded-xl
          px-3 py-2.5
          text-sm font-medium
          text-foreground/90
          transition-all duration-150

          hover:bg-accent/70
          focus:bg-accent/70
        "
      >
        <div className="flex w-full items-center justify-between">
          <span>{item.label}</span>

          <ChevronRight
            className="
              size-4 text-muted-foreground
              transition-transform duration-200
              group-data-[state=open]:translate-x-0.5
            "
          />
        </div>
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent
        sideOffset={8}
        className="
          min-w-[220px]
          rounded-2xl
          border border-border/60
          bg-popover/95
          p-2
          shadow-xl
          backdrop-blur-xl
        "
      >
        <div className="space-y-1">
          {item.children!.map((child) => (
            <MenuItemNodeDesktop key={child.label} item={child} />
          ))}
        </div>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

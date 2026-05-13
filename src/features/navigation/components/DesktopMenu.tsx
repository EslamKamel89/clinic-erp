import type { MenuItem } from "../../auth/types/auth.types";
import { MenuItemParentDesktop } from "./MenuItemParentDesktop";

type Props = {
  menus: MenuItem[];
};

export const DesktopMenu = ({ menus }: Props) => {
  return (
    <div className="hidden md:flex items-center gap-1 rounded-2xl border border-border/60 bg-card/50 p-1 shadow-sm backdrop-blur-sm">
      {menus.map((m) => (
        <MenuItemParentDesktop item={m} key={"MenuItemParent." + m.label} />
      ))}
    </div>
  );
};

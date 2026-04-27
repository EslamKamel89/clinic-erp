import type { MenuItem } from "../../auth/types/auth.types";
import { MenuItemParentDesktop } from "./MenuItemParentDesktop";
type Props = {
  menus: MenuItem[];
};
export const DesktopMenu = ({ menus }: Props) => {
  return (
    <div className=" hidden md:flex items-center gap-2">
      {menus.map((m) => (
        <MenuItemParentDesktop item={m} key={"MenuItemParent." + m.label} />
      ))}
    </div>
  );
};

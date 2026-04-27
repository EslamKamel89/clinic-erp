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
    <DropdownMenu key={item.label} dir={i18n.dir()}>
      <DropdownMenuTrigger asChild>
        <span className="text-sm cursor-pointer hover:text-primary">
          {item.label}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {item.children?.map((child) => (
          <MenuItemNodeDesktop key={child.label} item={child} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MenuItemNodeDesktop = ({ item }: Props) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <DropdownMenuItem asChild>
        <Link to={item.path || "#"}>{item.label}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
        {item.children!.map((child) => (
          <MenuItemNodeDesktop key={child.label} item={child} />
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

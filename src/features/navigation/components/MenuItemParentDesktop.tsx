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
        <span
          className="
            px-3 py-1.5
            text-sm font-semibold
            rounded-md
            cursor-pointer
            transition-all duration-150
            text-foreground/80
            hover:text-primary
            hover:bg-muted
          "
        >
          {item.label}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="
          min-w-[200px]
          p-1
          rounded-lg
          border
          bg-popover
          shadow-md
        "
      >
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
      <DropdownMenuItem
        asChild
        className="
          rounded-md
          px-2 py-1.5
          text-sm
          transition-colors
          hover:bg-muted
        "
      >
        <Link to={item.path || "#"}>{item.label}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className="
          rounded-md
          px-2 py-1.5
          text-sm
          font-medium
          transition-colors
          hover:bg-muted
        "
      >
        {item.label}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent
        className="
          min-w-[200px]
          p-1
          rounded-lg
          border
          bg-popover
          shadow-md
        "
      >
        {item.children!.map((child) => (
          <MenuItemNodeDesktop key={child.label} item={child} />
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

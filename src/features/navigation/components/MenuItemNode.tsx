import type { MenuItem } from "../../auth/types/auth.types";

type Props = {
  item: MenuItem;
};
export const MenuItemNode = ({ item }: Props) => {
  return (
    <div className="relative">
      <span className="text-sm cursor-pointer hover:text-primary">
        {item.label}
      </span>
      {item.children && item.children.length > 0 && (
        <div className="absolute top-full left-0 mt-2 min-w-[180px] rounded-md border bg-background shadow-md p-2">
          {item.children.map((child, index) => (
            <MenuItemNode item={child} key={child.label} />
          ))}
        </div>
      )}
    </div>
  );
};

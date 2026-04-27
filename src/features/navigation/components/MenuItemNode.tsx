import type { MenuItem } from "../../auth/types/auth.types";

type Props = {
  item: MenuItem;
};
export const MenuItemNode = ({ item }: Props) => {
  return (
    <div className="pl-2">
      <div>{item.label}</div>
      {item.children && item.children.length > 0 && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <MenuItemNode item={child} key={child.label} />
          ))}
        </div>
      )}
    </div>
  );
};

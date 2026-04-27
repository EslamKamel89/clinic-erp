import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../../auth/types/auth.types";

type Props = {
  item: MenuItem;
  onNavigate?: () => void;
};

export const MenuItemNodeMobile = ({ item, onNavigate }: Props) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Item */}
      <div
        className={`
          flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all
          ${
            hasChildren
              ? "cursor-pointer bg-muted/40 hover:bg-muted font-semibold"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }
        `}
        onClick={() => hasChildren && setOpen((p) => !p)}
      >
        {!hasChildren ? (
          <button
            className="w-full text-start ps-2"
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate) onNavigate();
              if (item.path) navigate(item.path);
            }}
          >
            {item.label}
          </button>
        ) : (
          <>
            <span>{item.label}</span>
            <ChevronDown
              className={`size-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div className="ms-3 border-l border-muted ps-3 space-y-1">
          {item.children?.map((child) => (
            <MenuItemNodeMobile
              key={child.path ?? child.label}
              item={child}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

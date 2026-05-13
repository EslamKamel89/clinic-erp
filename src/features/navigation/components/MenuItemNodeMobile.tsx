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
          group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm transition-all duration-200
          ${
            hasChildren
              ? `
                cursor-pointer
                bg-muted/40
                hover:border-border/60
                hover:bg-accent/60
                text-foreground
                font-medium
              `
              : `
                text-muted-foreground
                hover:bg-accent/60
                hover:text-foreground
              `
          }
        `}
        onClick={() => hasChildren && setOpen((p) => !p)}
      >
        {!hasChildren ? (
          <button
            className="w-full text-start"
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
              className={`
                size-4 text-muted-foreground transition-all duration-200
                ${open ? "rotate-180 text-foreground" : ""}
              `}
            />
          </>
        )}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div className="relative ms-4 mt-1 flex flex-col gap-1 border-s border-border/70 ps-4">
          {/* Decorative line glow */}
          <div className="absolute inset-y-0 start-[-1px] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

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

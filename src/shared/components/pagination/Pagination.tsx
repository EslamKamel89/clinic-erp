import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type PaginationProps = {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
};

const WINDOW_SIZE = 2;

export const Pagination = ({
  currentPage,
  onPageChange,
  total,
  limit,
  onLimitChange,
  limitOptions,
}: PaginationProps) => {
  const pages: (number | "...")[] = [];

  const start = Math.max(1, currentPage - WINDOW_SIZE);
  const end = Math.min(total, currentPage + WINDOW_SIZE);

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < total) {
    if (end < total - 1) {
      pages.push("...");
    }
    pages.push(total);
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* LEFT — LIMIT SELECT */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page</span>

        <Select
          value={String(limit)}
          onValueChange={(v) => onLimitChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[90px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {(limitOptions ?? [5, 10, 20, 50]).map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-1.5">
        {pages.map((item, i) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="px-2 text-sm text-muted-foreground"
              >
                …
              </span>
            );
          }

          const page = item;
          return (
            <Button
              key={`Pagination.${page}`}
              variant={page === currentPage ? "default" : "ghost"}
              disabled={currentPage === page}
              size="sm"
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
              className="min-w-9 px-3 cursor-pointer"
            >
              {page}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

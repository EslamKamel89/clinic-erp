import { Button } from "../../../components/ui/button";

type PaginationProps = {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
};

const WINDOW_SIZE = 2;

export const Pagination = ({
  currentPage,
  onPageChange,
  total,
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
    <div className="flex items-center justify-center gap-1.5">
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
        if (page < 1 || page > total) return <></>;
        return (
          <Button
            key={`Pagination.${page}`}
            variant={page === currentPage ? "default" : "ghost"}
            disabled={currentPage === total}
            size="sm"
            onClick={() => {
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
            className="min-w-9 px-3"
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

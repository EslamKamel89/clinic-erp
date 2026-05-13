import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Column, DataTableProps } from "./types";

export function DataTable<T>({
  data,
  columns,
  getRowId,
  emptyMessage,
}: DataTableProps<T>) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:block">
        <div
          className="
            overflow-hidden rounded-2xl
            border border-border/60
            bg-card/80
            shadow-sm
            backdrop-blur-sm
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Header */}
              <thead className="bg-gradient-to-b from-muted/70 to-muted/40">
                <tr className="border-b border-border/60">
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      scope="col"
                      className="
                        px-5 py-4
                        text-start text-xs font-semibold uppercase tracking-wide
                        text-muted-foreground
                      "
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-14">
                      <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <div className="rounded-2xl bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                          {emptyMessage ?? "No data available"}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, _) => {
                    const rawId = getRowId(row);

                    return (
                      <tr
                        key={rawId}
                        className="
                          group
                          border-b border-border/50
                          transition-all duration-200

                          hover:bg-accent/30

                          last:border-0
                        "
                      >
                        {columns.map((col) => (
                          <td
                            key={`${rawId}-${col.id}`}
                            className="
                              px-5 py-4
                              align-middle
                              text-sm
                            "
                          >
                            {renderCell(col, row)}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <div className="space-y-3">
          {data.length === 0 ? (
            <div
              className="
                rounded-2xl
                border border-border/60
                bg-card/80
                px-6 py-10
                text-center text-sm text-muted-foreground
                shadow-sm
                backdrop-blur-sm
              "
            >
              {emptyMessage ?? "No data available"}
            </div>
          ) : (
            data.map((row) => {
              const rowId = getRowId(row);

              return <RenderCard key={rowId} columns={columns} row={row} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

type RenderCardProps<T> = {
  columns: Column<T>[];
  row: T;
};

function RenderCard<T>({ columns, row }: RenderCardProps<T>) {
  const [open, setOpen] = useState(false);

  const titleColumn = columns.find((c) => c.mobile?.title) ?? columns[0];

  const visibleColumns = columns.filter(
    (col) => !col.mobile?.hidden && !col.mobile?.title,
  );

  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-border/60
        bg-card/80
        shadow-sm
        backdrop-blur-sm
        transition-all duration-200
      "
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          group w-full
          bg-gradient-to-r from-muted/50 via-muted/30 to-transparent
          px-4 py-4
          transition-colors duration-200

          hover:bg-accent/40
        "
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col items-start">
            <span className="truncate text-sm font-semibold text-foreground">
              {renderCell(titleColumn, row)}
            </span>

            <span className="mt-1 text-[11px] text-muted-foreground">
              Tap to view details
            </span>
          </div>

          <div
            className="
              flex size-8 shrink-0 items-center justify-center
              rounded-full
              bg-background/70
              border border-border/60
              shadow-sm
            "
          >
            <ChevronDown
              className={`
                size-4 text-muted-foreground
                transition-transform duration-300
                ${open ? "rotate-180" : ""}
              `}
            />
          </div>
        </div>
      </button>

      {/* Content */}
      {open && (
        <div className="divide-y divide-border/50 px-4 py-2">
          {visibleColumns.map((col) => (
            <div
              key={col.id}
              className="
                flex items-start justify-between gap-4
                py-3
              "
            >
              {/* Label */}
              <div className="min-w-0">
                <span
                  className="
                    text-[11px]
                    font-medium uppercase tracking-wide
                    text-muted-foreground
                  "
                >
                  {col.label}
                </span>
              </div>

              {/* Value */}
              <div
                className="
                  max-w-[60%]
                  text-right text-sm font-medium
                  break-words text-foreground
                "
              >
                {renderCell(col, row)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function renderCell<T>(col: Column<T>, row: T): ReactNode {
  const value = col.accessor(row);

  if (col.render) {
    return col.render(value, row);
  }

  switch (col.type) {
    case "boolean":
      return <span className="text-sm">{value === true ? "✔" : "✖"}</span>;

    case "number":
      return (
        <span className="tabular-nums font-medium">
          {typeof value === "number"
            ? value.toLocaleString()
            : value != null
              ? String(value)
              : ""}
        </span>
      );

    case "date":
      return (
        <span className="text-muted-foreground">
          {value instanceof Date
            ? value.toLocaleDateString()
            : value != null
              ? String(value)
              : ""}
        </span>
      );

    case "badge":
      return (
        <span
          className="
            inline-flex items-center rounded-full
            border border-border/60
            bg-accent/60
            px-2.5 py-1
            text-xs font-medium
          "
        >
          {value != null ? String(value) : ""}
        </span>
      );

    default:
      return value != null ? String(value) : "";
  }
}

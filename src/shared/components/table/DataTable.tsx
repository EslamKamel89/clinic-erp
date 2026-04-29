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
        <div className="w-full overflow-x-auto rounded-lg border bg-card">
          <table className="w-full text-sm">
            {/* Header */}
            <thead className="bg-muted/50">
              <tr className="border-b">
                {columns.map((col) => (
                  <th
                    key={col.id}
                    scope="col"
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
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
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage ?? "No data available"}
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={getRowId(row)}
                    className="border-b last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={`${getRowId(row)}-${col.id}`}
                        className="px-4 py-3 align-middle"
                      >
                        {renderCell(col, row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <div className="space-y-3">
          {data.length === 0 ? (
            <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
              {emptyMessage ?? "No data available"}
            </div>
          ) : (
            data.map((row) => {
              const rowId = getRowId(row);
              return <div key={rowId}>{RenderCard(columns, row)}</div>;
            })
          )}
        </div>
      </div>
    </div>
  );
}

function RenderCard<T>(columns: Column<T>[], row: T): ReactNode {
  const [open, setOpen] = useState(false);
  const titleColumn = columns.find((c) => c.mobile?.title) ?? columns[0];
  const visibleColumns = columns.filter(
    (col) => !col.mobile?.hidden && !col.mobile?.title,
  );

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Header (clickable) */}
      <div
        className="px-4 py-3 border-b bg-muted/40 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="text-sm font-semibold leading-none">
          {renderCell(titleColumn, row)}
        </div>

        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Collapsible Content */}
      {open && (
        <div className="px-4 py-3 divide-y">
          {visibleColumns.map((col) => (
            <div
              key={col.id}
              className="flex items-start justify-between gap-4 py-2"
            >
              <span className="text-xs text-muted-foreground leading-none">
                {col.label}
              </span>

              <div className="text-sm text-right font-medium break-words max-w-[60%]">
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
        <span className="tabular-nums">
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
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
          {value != null ? String(value) : ""}
        </span>
      );

    default:
      return value != null ? String(value) : "";
  }
}

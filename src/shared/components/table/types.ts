import type { ReactNode } from "react";

export type ColumnType = "text" | "number" | "boolean" | "badge" | "date";
export type Column<T> = {
  id: string;
  label: string;
  accessor: (row: T) => unknown;
  type?: ColumnType;
  render?: (value: unknown, row: T) => ReactNode;
  mobile?: {
    hidden?: boolean;
    title?: boolean;
  };
};
export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
};

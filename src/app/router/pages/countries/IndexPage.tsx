import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useCountries } from "../../../../features/countries/hooks/useCountries";
import type { Country } from "../../../../features/countries/types/country.types";
import { DataTable } from "../../../../shared/components/table/DataTable";
import type { Column } from "../../../../shared/components/table/types";

export const CountryIndexPage = () => {
  const { data, isLoading } = useCountries({ page: 1, limit: 10 });

  const columns: Column<Country>[] = [
    {
      id: "name",
      label: "Name",
      accessor: (row) => row.name,
      mobile: { title: true },
    },
    {
      id: "phoneCode",
      label: "Phone Code",
      accessor: (row) => row.phoneCode,
    },
    {
      id: "notes",
      label: "Notes",
      accessor: (row) => row.notes,
    },
    {
      id: "actions",
      label: "",
      accessor: () => null,
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => console.log("Edit:", row)}
          >
            <Pencil className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => console.log("Delete:", row)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Countries</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view available countries
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
            <p className="text-sm text-muted-foreground">
              Loading countries...
            </p>
          </div>
        </div>
      ) : (
        <DataTable
          data={data?.data ?? []}
          columns={columns}
          getRowId={(row) => row.id}
          emptyMessage="No countries found"
        />
      )}
    </div>
  );
};

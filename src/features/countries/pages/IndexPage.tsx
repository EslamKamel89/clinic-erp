import { TText } from "@/shared/components/localization/TText";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { Pagination } from "../../../shared/components/pagination/Pagination";
import { DataTable } from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/types";
import { usePermissions } from "../../../shared/lib/permissions/usePermissions";
import { queryClientKeys } from "../../../shared/lib/query/keys";
import { CountryCreateSheet } from "../components/CountryCreateSheet";
import { CountryUpdateSheet } from "../components/CountryUpdateSheet";
import { DeleteButton } from "../components/DeleteButton";
import { useCountries } from "../hooks/useCountries";
import type { Country } from "../types/country.types";

export const CountryIndexPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { items, currentPage, isError, total, isLoading } = useCountries({
    page,
    limit,
  });

  const { can } = usePermissions();

  const canCreate = can("countries", "create");
  const canUpdate = can("countries", "update");
  const canDelete = can("countries", "delete");

  const columns: Column<Country>[] = [
    {
      id: "name",
      label: <TText ns="p002" k="name" width={6} />,
      accessor: (row) => row.name,
      mobile: { title: true },
    },
    {
      id: "phoneCode",
      label: <TText ns="p002" k="phone_code" width={8} />,
      accessor: (row) => row.phoneCode,
    },
    {
      id: "notes",
      label: <TText ns="p002" k="notes" width={6} />,
      accessor: (row) => row.notes,
    },
    {
      id: "actions",
      label: "",
      accessor: () => null,
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1">
          {canUpdate && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSelectedCountry(row);
                setIsUpdateOpen(true);
              }}
            >
              <Pencil className="size-4" />
            </Button>
          )}

          {canDelete && (
            <DeleteButton
              country={row}
              onDelete={() => {
                const isLastItemOnPage = items?.length === 1;
                if (isLastItemOnPage && page > 1) {
                  setPage((prev) => prev - 1);
                }
              }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            <TText ns="p002" k="title" width={8} />
          </h1>

          <p className="text-sm text-muted-foreground">
            <TText ns="p002" k="subtitle" width={20} />
          </p>
        </div>

        {canCreate && (
          <Button onClick={() => setIsCreateOpen(true)}>
            <TText ns="p002" k="add" width={5} className="text-md" />
          </Button>
        )}
      </div>

      <Separator />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />

            <p className="text-sm text-muted-foreground">
              <TText ns="p002" k="loading" width={12} />
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-destructive">
              <TText ns="p002" k="error" width={14} />
            </p>

            <Button
              variant="outline"
              onClick={async () => {
                await queryClient.invalidateQueries({
                  queryKey: queryClientKeys.countries.main,
                });
                setPage(1);
              }}
            >
              <TText ns="p002" k="retry" width={5} />
            </Button>
          </div>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {/* Table */}
          <DataTable
            data={items ?? []}
            columns={columns}
            getRowId={(row) => row.id}
            emptyMessage={<TText ns="p002" k="empty" width={12} />}
          />

          {/* Pagination */}
          {items && (
            <div className="flex items-center justify-center pt-2">
              <Pagination
                currentPage={currentPage ?? 1}
                total={total ?? 1}
                onPageChange={setPage}
                limit={limit}
                onLimitChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Sheets */}
      <CountryCreateSheet
        onOpenChange={(open) => setIsCreateOpen(open)}
        open={isCreateOpen}
      />

      <CountryUpdateSheet
        country={selectedCountry}
        onOpenChange={(open) => {
          setIsUpdateOpen(open);
          if (!open) setSelectedCountry(null);
        }}
        open={isUpdateOpen}
      />
    </div>
  );
};

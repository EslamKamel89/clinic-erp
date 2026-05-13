import { appRoutes } from "@/features/navigation/routes";
import { ErrorState } from "@/shared/components/error/ErrorState";
import { TText } from "@/shared/components/localization/TText";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { DataTable } from "@/shared/components/table/DataTable";
import type { Column } from "@/shared/components/table/types";
import { usePermissions } from "@/shared/lib/permissions/usePermissions";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { DeleteDoctorButton } from "../components/DeleteDoctorButton";
import { useDoctors } from "../hooks/useDoctors";
import type { Doctor } from "../types/doctor.types";

export const DoctorIndexPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const { items, currentPage, isError, total, isLoading } = useDoctors({
    page,
    limit,
  });

  const { can } = usePermissions();

  const canCreate = can("doctors", "create");

  const canUpdate = can("doctors", "update");

  const canDelete = can("doctors", "delete");

  const canShow = can("doctors", "show");

  const hasActions = canShow || canUpdate || canDelete;
  const columns: Column<Doctor>[] = [
    {
      id: "name",

      label: <TText ns="p009" k="name" width={8} />,

      accessor: (row) => row.name,

      mobile: {
        title: true,
      },
    },
    {
      id: "specialty_name",
      label: <TText ns="p009" k="specialty_name" width={8} />,
      accessor: (row) => row.specialtyName,
    },
    {
      id: "phone",

      label: <TText ns="p009" k="phone" width={10} />,

      accessor: (row) => row.phone,
    },

    {
      id: "address",

      label: <TText ns="p009" k="address" width={10} />,

      accessor: (row) => row.address,
    },

    {
      id: "branch",

      label: <TText ns="p009" k="branch" width={8} />,

      accessor: (row) => row.branchName,
    },

    {
      id: "socialId",

      label: <TText ns="p009" k="social_id" width={10} />,

      accessor: (row) => row.socialId,
    },

    {
      id: "notes",

      label: <TText ns="p009" k="notes" width={8} />,

      accessor: (row) => row.notes,
    },
  ];
  if (hasActions) {
    columns.push({
      id: "actions",
      label: <TText ns="p009" k="actions" width={8} />,
      accessor: () => null,
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1">
          {canShow && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                navigate(appRoutes.doctor.show(row.id));
              }}
            >
              <Eye className="size-4" />
            </Button>
          )}
          {canUpdate && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                navigate(appRoutes.doctor.edit(row.id));
              }}
            >
              <Pencil className="size-4" />
            </Button>
          )}
          {canDelete && (
            <DeleteDoctorButton
              doctor={row}
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
    });
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            <TText ns="p009" k="title" width={10} />
          </h1>

          <p className="text-sm text-muted-foreground">
            <TText ns="p009" k="subtitle" width={25} />
          </p>
        </div>

        {canCreate && (
          <Button
            onClick={() => {
              navigate(appRoutes.doctor.create);
            }}
          >
            <TText ns="p009" k="add" width={10} />
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
              <TText ns="p009" k="loading" width={16} />
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <ErrorState
          onRetry={async () => {
            await queryClient.invalidateQueries({
              queryKey: queryClientKeys.doctors.main,
            });
            setPage(1);
          }}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {/* Table */}
          <DataTable
            data={items ?? []}
            columns={columns}
            getRowId={(row) => row.id}
            emptyMessage={<TText ns="p009" k="empty" width={14} />}
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
    </div>
  );
};

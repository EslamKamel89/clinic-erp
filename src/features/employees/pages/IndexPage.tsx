import { appRoutes } from "@/features/navigation/routes";
import { TText } from "@/shared/components/localization/TText";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { DataTable } from "@/shared/components/table/DataTable";
import type { Column } from "@/shared/components/table/types";
import { usePermissions } from "@/shared/lib/permissions/usePermissions";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useEmployees } from "../hooks/useEmployees";
import type { Employee } from "../types/employee.types";

export const EmployeeIndexPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const { items, currentPage, isError, total, isLoading } = useEmployees({
    page,
    limit,
  });

  const { can } = usePermissions();

  const canCreate = can("employees", "create");

  const canUpdate = can("employees", "update");

  const canDelete = can("employees", "delete");

  const canShow = can("employees", "show");

  const hasActions = canShow || canUpdate || canDelete;
  const columns: Column<Employee>[] = [
    {
      id: "name",

      label: <TText ns="p008" k="name" width={8} />,

      accessor: (row) => row.name,

      mobile: {
        title: true,
      },
    },
    {
      id: "job_name",
      label: <TText ns="p008" k="job_name" width={8} />,
      accessor: (row) => row.jobName,
    },
    {
      id: "phone",

      label: <TText ns="p008" k="phone" width={10} />,

      accessor: (row) => row.phone,
    },

    {
      id: "address",

      label: <TText ns="p008" k="address" width={10} />,

      accessor: (row) => row.address,
    },

    {
      id: "branch",

      label: <TText ns="p008" k="branch" width={8} />,

      accessor: (row) => row.branchName,
    },

    {
      id: "socialId",

      label: <TText ns="p008" k="social_id" width={10} />,

      accessor: (row) => row.socialId,
    },

    {
      id: "notes",

      label: <TText ns="p008" k="notes" width={8} />,

      accessor: (row) => row.notes,
    },
  ];
  if (hasActions) {
    columns.push({
      id: "actions",
      label: <TText ns="p008" k="actions" width={8} />,
      accessor: () => null,
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1">
          {canShow && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                navigate(appRoutes.employee.show(row.id));
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
                navigate(appRoutes.employee.edit(row.id));
              }}
            >
              <Pencil className="size-4" />
            </Button>
          )}
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
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
            <TText ns="p008" k="title" width={10} />
          </h1>

          <p className="text-sm text-muted-foreground">
            <TText ns="p008" k="subtitle" width={25} />
          </p>
        </div>

        {canCreate && (
          <Button
            onClick={() => {
              navigate(appRoutes.employee.create);
            }}
          >
            <TText ns="p008" k="add" width={10} />
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
              <TText ns="p008" k="loading" width={16} />
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-destructive">
              <TText ns="p008" k="error" width={16} />
            </p>

            <Button
              variant="outline"
              onClick={async () => {
                await queryClient.invalidateQueries({
                  queryKey: queryClientKeys.employees.main,
                });

                setPage(1);
              }}
            >
              <TText ns="p008" k="retry" width={6} />
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
            emptyMessage={<TText ns="p008" k="empty" width={14} />}
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

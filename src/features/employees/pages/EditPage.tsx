import { appRoutes } from "@/features/navigation/routes";
import { Breadcrumbs } from "@/shared/components/breadcrumbs/Breadcrumbs";
import { ErrorState } from "@/shared/components/error/ErrorState";
import { TText } from "@/shared/components/localization/TText";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { EmployeeForm } from "../components/EmployeeForm";
import { useEmployeeDetails } from "../hooks/useEmployeeDetails";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { serializeEmployeeToFormValues } from "../serializers/employeeForm.serializer";

export const EmployeeEditPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading, isError } = useEmployeeDetails(id);
  const queryClient = useQueryClient();
  const updateMutation = useUpdateEmployee();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p008" k="loading" width={12} />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <ErrorState
        onRetry={async () => {
          await queryClient.invalidateQueries({
            queryKey: queryClientKeys.employees.details(id),
          });
        }}
      />
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Breadcrumbs
          resourceHref={appRoutes.employee.index}
          resourceLabel={<TText ns="p008" k="title" width={12} />}
          currentPageLabel={<TText ns="p008" k="edit" width={12} />}
        />

        <h1 className="text-2xl font-semibold tracking-tight">
          <TText ns="p008" k="edit" width={12} />
        </h1>
      </div>
      {data.employee && (
        <EmployeeForm
          defaultValues={serializeEmployeeToFormValues(data.employee)}
          genders={data.lookups.genders}
          branches={data.lookups.branches}
          countries={data.lookups.countries}
          maritalStatuses={data.lookups.maritalStatuses}
          militaryStatuses={data.lookups.militaryStatuses}
          jobs={data.lookups.jobs}
          onSubmit={(values) => {
            console.log(values);
            updateMutation.mutate({ id, values });
          }}
        />
      )}
    </div>
  );
};

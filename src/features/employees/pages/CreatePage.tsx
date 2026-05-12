import { appRoutes } from "@/features/navigation/routes";
import { Breadcrumbs } from "@/shared/components/breadcrumbs/Breadcrumbs";
import { TText } from "@/shared/components/localization/TText";
import { EmployeeForm } from "../components/EmployeeForm";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useEmployeeDetails } from "../hooks/useEmployeeDetails";

export const EmployeeCreatePage = () => {
  const { data, isLoading, isError } = useEmployeeDetails(0);
  const createMutation = useCreateEmployee();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p008" k="loading" width={12} />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p008" k="error" width={12} />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Breadcrumbs
          resourceHref={appRoutes.employee.index}
          resourceLabel={<TText ns="p008" k="title" width={12} />}
          currentPageLabel={<TText ns="p008" k="add" width={12} />}
        />

        <h1 className="text-2xl font-semibold tracking-tight">
          <TText ns="p008" k="add" width={12} />
        </h1>
      </div>

      <EmployeeForm
        defaultValues={{}}
        genders={data.lookups.genders}
        branches={data.lookups.branches}
        countries={data.lookups.countries}
        maritalStatuses={data.lookups.maritalStatuses}
        militaryStatuses={data.lookups.militaryStatuses}
        jobs={data.lookups.jobs}
        onSubmit={(values) => {
          console.log(values);
          createMutation.mutate(values);
        }}
      />
    </div>
  );
};

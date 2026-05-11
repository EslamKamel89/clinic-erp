import { appRoutes } from "@/features/navigation/routes";
import { TText } from "@/shared/components/localization/TText";
import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components/EmployeeForm";
import { useEmployeeDetails } from "../hooks/useEmployeeDetails";

export const EmployeeCreatePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useEmployeeDetails(0);

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
      <div>
        <h1 className="text-2xl font-semibold">
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

          navigate(appRoutes.employee.index);
        }}
      />
    </div>
  );
};

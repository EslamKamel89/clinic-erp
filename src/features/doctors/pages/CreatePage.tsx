import { appRoutes } from "@/features/navigation/routes";
import { Breadcrumbs } from "@/shared/components/breadcrumbs/Breadcrumbs";
import { TText } from "@/shared/components/localization/TText";
import { DoctorForm } from "../components/DoctorForm";
import { useCreateDoctor } from "../hooks/useCreateDoctor";
import { useDoctorDetails } from "../hooks/useDoctorDetails";

export const DoctorCreatePage = () => {
  const { data, isLoading, isError } = useDoctorDetails(0);
  const createMutation = useCreateDoctor();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p009" k="loading" width={12} />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p009" k="error" width={12} />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Breadcrumbs
          resourceHref={appRoutes.doctor.index}
          resourceLabel={<TText ns="p009" k="title" width={12} />}
          currentPageLabel={<TText ns="p009" k="add" width={12} />}
        />

        <h1 className="text-2xl font-semibold tracking-tight">
          <TText ns="p009" k="add" width={12} />
        </h1>
      </div>

      <DoctorForm
        defaultValues={{}}
        genders={data.lookups.genders}
        branches={data.lookups.branches}
        countries={data.lookups.countries}
        maritalStatuses={data.lookups.maritalStatuses}
        militaryStatuses={data.lookups.militaryStatuses}
        specialties={data.lookups.specialties}
        onSubmit={(values) => {
          console.log(values);
          createMutation.mutate(values);
        }}
      />
    </div>
  );
};

import { appRoutes } from "@/features/navigation/routes";
import { Breadcrumbs } from "@/shared/components/breadcrumbs/Breadcrumbs";
import { ErrorState } from "@/shared/components/error/ErrorState";
import { TText } from "@/shared/components/localization/TText";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DoctorForm } from "../components/DoctorForm";
import { useDoctorDetails } from "../hooks/useDoctorDetails";
import { serializeDoctorToFormValues } from "../serializers/doctorForm.serializer";

export const DoctorShowPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading, isError } = useDoctorDetails(id);
  const queryClient = useQueryClient();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <TText ns="p009" k="loading" width={12} />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <ErrorState
        onRetry={async () => {
          await queryClient.invalidateQueries({
            queryKey: queryClientKeys.doctors.details(id),
          });
        }}
      />
    );
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Breadcrumbs
          resourceHref={appRoutes.doctor.index}
          resourceLabel={<TText ns="p009" k="title" width={12} />}
          currentPageLabel={<TText ns="p009" k="show" width={12} />}
        />

        <h1 className="text-2xl font-semibold tracking-tight">
          <TText ns="p009" k="show" width={12} />
        </h1>
      </div>
      {data.doctor && (
        <DoctorForm
          disabled
          defaultValues={serializeDoctorToFormValues(data.doctor)}
          genders={data.lookups.genders}
          branches={data.lookups.branches}
          countries={data.lookups.countries}
          maritalStatuses={data.lookups.maritalStatuses}
          militaryStatuses={data.lookups.militaryStatuses}
          specialties={data.lookups.specialties}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};

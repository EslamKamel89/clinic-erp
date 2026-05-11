import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TText } from "@/shared/components/localization/TText";
import type { SelectOption } from "@/shared/lib/api/types";
import { useLocalization } from "@/shared/lib/localization/useLocalization";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  employeeSchema,
  type EmployeeSchema,
} from "../schemas/employee.schema";
import type { EmployeeFormValues } from "../types/employeeForm.types";
import { CountryStateCityFields } from "./CountryStateCityFields";

type Props = {
  disabled?: boolean;

  isLoading?: boolean;

  defaultValues: Partial<EmployeeFormValues>;

  genders: SelectOption[];

  branches: SelectOption[];

  countries: SelectOption[];

  maritalStatuses: SelectOption[];

  militaryStatuses: SelectOption[];

  jobs: SelectOption[];

  onSubmit: (data: EmployeeSchema) => void;
};

export const EmployeeForm = ({
  disabled,
  isLoading,
  defaultValues,
  genders,
  branches,
  countries,
  maritalStatuses,
  militaryStatuses,
  jobs,
  onSubmit,
}: Props) => {
  const { t } = useLocalization("p008");
  const { t: tValidation } = useLocalization("validation");

  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      active: true,
      nationalId: "",
      address: "",
      phone: "",
      mobile: "",
      email: null,
      genderId: undefined,
      branchId: undefined,
      socialId: "",
      maritalStatusId: null,
      militaryStatusId: undefined,
      birthDate: "",
      countryId: null,
      stateId: null,
      cityId: null,
      notes: "",
      jobId: undefined,
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Status */}
      <div className="rounded-lg border bg-muted/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">
              <TText ns="p008" k="active" width={8} />
            </Label>

            <p className="text-xs text-muted-foreground">
              <TText ns="p008" k="employee_availability_status" width={24} />
            </p>
          </div>

          <Controller
            control={control}
            name="active"
            render={({ field }) => (
              <Switch
                disabled={disabled}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      {/* Basic Information */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            <TText ns="p008" k="basic_information" width={16} />
          </h2>

          <p className="text-sm text-muted-foreground">
            <TText ns="p008" k="basic_information_description" width={32} />
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <Field className="space-y-2" data-invalid={!!errors.name}>
            <FieldLabel>
              <TText ns="p008" k="name" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("name")} />

            {errors.name && (
              <FieldError>{tValidation(errors.name.message!)}</FieldError>
            )}
          </Field>

          {/* Gender */}
          <Field className="space-y-2" data-invalid={!!errors.genderId}>
            <FieldLabel>
              <TText ns="p008" k="gender" width={8} />
            </FieldLabel>

            <Controller
              control={control}
              name="genderId"
              render={({ field }) => (
                <Select
                  disabled={disabled}
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_gender")} />
                  </SelectTrigger>

                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem
                        key={gender.value}
                        value={gender.value.toString()}
                      >
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.genderId && (
              <FieldError>{tValidation(errors.genderId.message!)}</FieldError>
            )}
          </Field>

          {/* Branch */}
          <Field className="space-y-2" data-invalid={!!errors.branchId}>
            <FieldLabel>
              <TText ns="p008" k="branch" width={8} />
            </FieldLabel>

            <Controller
              control={control}
              name="branchId"
              render={({ field }) => (
                <Select
                  disabled={disabled}
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_branch")} />
                  </SelectTrigger>

                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem
                        key={branch.value}
                        value={branch.value.toString()}
                      >
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.branchId && (
              <FieldError>{tValidation(errors.branchId.message!)}</FieldError>
            )}
          </Field>

          {/* Job */}
          <Field className="space-y-2" data-invalid={!!errors.jobId}>
            <FieldLabel>
              <TText ns="p008" k="job_name" width={8} />
            </FieldLabel>

            <Controller
              control={control}
              name="jobId"
              render={({ field }) => (
                <Select
                  disabled={disabled}
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_job")} />
                  </SelectTrigger>

                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.value} value={job.value.toString()}>
                        {job.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.jobId && (
              <FieldError>{tValidation(errors.jobId.message!)}</FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* Personal Information */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            <TText ns="p008" k="personal_information" width={18} />
          </h2>

          <p className="text-sm text-muted-foreground">
            <TText ns="p008" k="personal_information_description" width={28} />
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* National ID */}
          <Field className="space-y-2" data-invalid={!!errors.nationalId}>
            <FieldLabel>
              <TText ns="p008" k="national_id" width={10} />
            </FieldLabel>

            <Input disabled={disabled} {...register("nationalId")} />

            {errors.nationalId && (
              <FieldError>{tValidation(errors.nationalId.message!)}</FieldError>
            )}
          </Field>

          {/* Social ID */}
          <Field className="space-y-2" data-invalid={!!errors.socialId}>
            <FieldLabel>
              <TText ns="p008" k="social_id" width={10} />
            </FieldLabel>

            <Input disabled={disabled} {...register("socialId")} />

            {errors.socialId && (
              <FieldError>{tValidation(errors.socialId.message!)}</FieldError>
            )}
          </Field>

          {/* Birth Date */}
          <Field className="space-y-2" data-invalid={!!errors.birthDate}>
            <FieldLabel>
              <TText ns="p008" k="birth_date" width={10} />
            </FieldLabel>

            <Input type="date" disabled={disabled} {...register("birthDate")} />

            {errors.birthDate && (
              <FieldError>{tValidation(errors.birthDate.message!)}</FieldError>
            )}
          </Field>

          {/* Military Status */}
          <Field className="space-y-2">
            <FieldLabel>
              <TText ns="p008" k="military_status" width={12} />
            </FieldLabel>

            <Controller
              control={control}
              name="militaryStatusId"
              render={({ field }) => (
                <Select
                  disabled={disabled}
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_military_status")} />
                  </SelectTrigger>

                  <SelectContent>
                    {militaryStatuses.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value.toString()}
                      >
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          {/* Marital Status */}
          <Field className="space-y-2">
            <FieldLabel>
              <TText ns="p008" k="marital_status" width={12} />
            </FieldLabel>

            <Controller
              control={control}
              name="maritalStatusId"
              render={({ field }) => (
                <Select
                  disabled={disabled}
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_marital_status")} />
                  </SelectTrigger>

                  <SelectContent>
                    {maritalStatuses.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value.toString()}
                      >
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            <TText ns="p008" k="contact_information" width={18} />
          </h2>

          <p className="text-sm text-muted-foreground">
            <TText ns="p008" k="contact_information_description" width={28} />
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Phone */}
          <Field className="space-y-2" data-invalid={!!errors.phone}>
            <FieldLabel>
              <TText ns="p008" k="phone" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("phone")} />

            {errors.phone && (
              <FieldError>{tValidation(errors.phone.message!)}</FieldError>
            )}
          </Field>

          {/* Mobile */}
          <Field className="space-y-2" data-invalid={!!errors.mobile}>
            <FieldLabel>
              <TText ns="p008" k="mobile" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("mobile")} />

            {errors.mobile && (
              <FieldError>{tValidation(errors.mobile.message!)}</FieldError>
            )}
          </Field>

          {/* Email */}
          <Field
            className="space-y-2 md:col-span-2"
            data-invalid={!!errors.email}
          >
            <FieldLabel>
              <TText ns="p008" k="email" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("email")} />

            {errors.email && (
              <FieldError>{tValidation(errors.email.message!)}</FieldError>
            )}
          </Field>

          {/* Address */}
          <Field
            className="space-y-2 md:col-span-2"
            data-invalid={!!errors.address}
          >
            <FieldLabel>
              <TText ns="p008" k="address" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("address")} />

            {errors.address && (
              <FieldError>{tValidation(errors.address.message!)}</FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* Location */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            <TText ns="p008" k="location_information" width={12} />
          </h2>

          <p className="text-sm text-muted-foreground">
            <TText ns="p008" k="location_information_description" width={28} />
          </p>
        </div>

        <CountryStateCityFields
          disabled={disabled}
          countryId={watch("countryId")}
          stateId={watch("stateId")}
          cityId={watch("cityId")}
          countries={countries}
          onCountryChange={(v) => {
            setValue("countryId", v);
          }}
          onStateChange={(v) => {
            setValue("stateId", v);
          }}
          onCityChange={(v) => {
            setValue("cityId", v);
          }}
        />
      </section>

      {/* Additional Notes */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            <TText ns="p008" k="additional_notes" width={16} />
          </h2>
        </div>

        <Field className="space-y-2">
          <FieldLabel>
            <TText ns="p008" k="notes" width={8} />
          </FieldLabel>

          <Input disabled={disabled} {...register("notes")} />
        </Field>
      </section>

      {/* Submit */}
      {!disabled && (
        <div className="flex justify-end pt-2">
          <Button disabled={isLoading} type="submit">
            <TText ns="p008" k="save" width={8} />
          </Button>
        </div>
      )}
    </form>
  );
};

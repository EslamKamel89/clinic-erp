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
  const { t } = useLocalization("validation");

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
              Employee availability status
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
            Basic Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Main employee identity and assignment data
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <Field className="space-y-2" data-invalid={!!errors.name}>
            <FieldLabel>
              <TText ns="p008" k="name" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("name")} />

            {errors.name && <FieldError>{t(errors.name.message!)}</FieldError>}
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
              <FieldError>{t(errors.genderId.message!)}</FieldError>
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
              <FieldError>{t(errors.branchId.message!)}</FieldError>
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
              <FieldError>{t(errors.jobId.message!)}</FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* Personal Information */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            Personal Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Identification and personal records
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
              <FieldError>{t(errors.nationalId.message!)}</FieldError>
            )}
          </Field>

          {/* Social ID */}
          <Field className="space-y-2" data-invalid={!!errors.socialId}>
            <FieldLabel>
              <TText ns="p008" k="social_id" width={10} />
            </FieldLabel>

            <Input disabled={disabled} {...register("socialId")} />

            {errors.socialId && (
              <FieldError>{t(errors.socialId.message!)}</FieldError>
            )}
          </Field>

          {/* Birth Date */}
          <Field className="space-y-2" data-invalid={!!errors.birthDate}>
            <FieldLabel>
              <TText ns="p008" k="birth_date" width={10} />
            </FieldLabel>

            <Input type="date" disabled={disabled} {...register("birthDate")} />

            {errors.birthDate && (
              <FieldError>{t(errors.birthDate.message!)}</FieldError>
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
                    <SelectValue placeholder={t("select_martial_status")} />
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
            Contact Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Communication and address details
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
              <FieldError>{t(errors.phone.message!)}</FieldError>
            )}
          </Field>

          {/* Mobile */}
          <Field className="space-y-2" data-invalid={!!errors.mobile}>
            <FieldLabel>
              <TText ns="p008" k="mobile" width={8} />
            </FieldLabel>

            <Input disabled={disabled} {...register("mobile")} />

            {errors.mobile && (
              <FieldError>{t(errors.mobile.message!)}</FieldError>
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
              <FieldError>{t(errors.email.message!)}</FieldError>
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
              <FieldError>{t(errors.address.message!)}</FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* Location */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">Location</h2>

          <p className="text-sm text-muted-foreground">
            Country, state, and city information
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
            Additional Notes
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

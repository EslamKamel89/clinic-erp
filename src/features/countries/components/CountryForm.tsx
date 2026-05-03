import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { countrySchema, type CountryFormData } from "../schemas/country.schema";

type Props = {
  defaultValues?: Partial<CountryFormData>;
  onSubmit: (data: CountryFormData) => void;
  isLoading: boolean;
};

export const CountryForm = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const { t } = useLocalization("p002");

  const { t: tValidation } = useLocalization("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      Obj_Name: "",
      PhoneCode: "",
      Notes: "",
      ...defaultValues,
    },
  });

  const submitHandler = (values: CountryFormData) => {
    onSubmit(values);
  };

  const nameError = errors.Obj_Name?.message;
  const phoneError = errors.PhoneCode?.message;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {/* Name */}
      <Field className="space-y-2" data-invalid={!!nameError}>
        <FieldLabel htmlFor="Obj_Name">{t("name")}</FieldLabel>
        <Input
          id="Obj_Name"
          placeholder={t("name_placeholder")}
          {...register("Obj_Name")}
          aria-invalid={!!nameError}
        />
        {nameError && <FieldError>{tValidation(nameError)}</FieldError>}
      </Field>

      {/* Phone Code */}
      <Field className="space-y-2" data-invalid={!!phoneError}>
        <FieldLabel htmlFor="PhoneCode">{t("phone_code")}</FieldLabel>
        <Input
          id="PhoneCode"
          placeholder={t("phone_placeholder")}
          {...register("PhoneCode")}
          aria-invalid={!!phoneError}
        />
        {phoneError && <FieldError>{phoneError}</FieldError>}
      </Field>

      {/* Notes */}
      <Field className="space-y-2">
        <FieldLabel htmlFor="Notes">{t("notes")}</FieldLabel>
        <Input
          id="Notes"
          placeholder={t("notes_placeholder")}
          {...register("Notes")}
        />
      </Field>

      {/* Actions */}
      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t("saving") : t("save")}
        </Button>
      </div>
    </form>
  );
};

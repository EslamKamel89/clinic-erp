import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

type Props = {
  mutation: ReturnType<typeof useLogin>;
};

export const LoginForm = ({ mutation }: Props) => {
  const { t: tUI } = useLocalization("p001");
  const { t: tValidation } = useLocalization("validation");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormData) => {
    mutation.mutate({ username: values.username, password: values.password });
  };

  const usernameError = errors.username?.message;
  const passwordError = errors.password?.message;
  const apiError = mutation.error?.message;
  return (
    <div className="w-full rounded-2xl border bg-card p-7 shadow-sm">
      {/* Header */}
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {tUI("login_button")}
        </h1>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
          {apiError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username */}
        <Field className="space-y-2" data-invalid={!!usernameError}>
          <FieldLabel htmlFor="username">{tUI("username_label")}</FieldLabel>

          <Input
            id="username"
            placeholder={tUI("username_placeholder")}
            {...register("username")}
            aria-invalid={!!usernameError}
          />

          {usernameError && (
            <FieldError className="text-xs text-destructive">
              {tValidation(usernameError)}
            </FieldError>
          )}
        </Field>

        {/* Password */}
        <Field className="space-y-2" data-invalid={!!passwordError}>
          <FieldLabel htmlFor="password">{tUI("password_label")}</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder={tUI("password_placeholder")}
            {...register("password")}
            aria-invalid={!!passwordError}
          />

          {passwordError && (
            <FieldError className="text-xs text-destructive">
              {tValidation(passwordError)}
            </FieldError>
          )}
        </Field>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-2 cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? tUI("loading") : tUI("login_button")}
        </Button>
      </form>
    </div>
  );
};

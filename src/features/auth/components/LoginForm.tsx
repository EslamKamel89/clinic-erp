import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
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

  return (
    <div className="w-full rounded-2xl border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {tUI("login_button")}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="username">{tUI("username_label")}</FieldLabel>

          <Input
            id="username"
            placeholder={tUI("username_placeholder")}
            {...register("username")}
            aria-invalid={!!usernameError}
          />

          {usernameError && (
            <p className="text-xs text-destructive">
              {tValidation(usernameError)}
            </p>
          )}
        </Field>

        {/* Password */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="password">{tUI("password_label")}</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder={tUI("password_placeholder")}
            {...register("password")}
            aria-invalid={!!passwordError}
          />

          {passwordError && (
            <p className="text-xs text-destructive">
              {tValidation(passwordError)}
            </p>
          )}
        </Field>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? tUI("loading") : tUI("login_button")}
        </Button>
      </form>
    </div>
  );
};

import { AlertCircle, Loader2, LockKeyhole, User2 } from "lucide-react";

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
    mutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  const usernameError = errors.username?.message;

  const passwordError = errors.password?.message;

  const apiError = mutation.error?.message;

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl
        border border-border/60
        bg-card/70
        shadow-xl
        backdrop-blur-xl
      "
    >
      {/* Decorative Glow */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-primary/5
          via-transparent
          to-accent/20
        "
      />

      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            {tUI("login_button")}
          </h2>

          <p className="text-sm text-muted-foreground">
            Secure access to your workspace
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <div
            className="
              mb-5 flex items-start gap-3
              rounded-2xl
              border border-destructive/20
              bg-destructive/10
              px-4 py-3
              text-sm text-destructive
            "
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />

            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <Field className="space-y-2" data-invalid={!!usernameError}>
            <FieldLabel htmlFor="username">{tUI("username_label")}</FieldLabel>

            <div className="relative">
              <User2
                className="
                  pointer-events-none absolute start-3 top-1/2
                  size-4 -translate-y-1/2
                  text-muted-foreground
                "
              />

              <Input
                id="username"
                placeholder={tUI("username_placeholder")}
                className="
                  h-11 rounded-xl
                  border-border/60
                  bg-background/70
                  ps-10
                "
                {...register("username")}
                aria-invalid={!!usernameError}
              />
            </div>

            {usernameError && (
              <FieldError className="text-xs">
                {tValidation(usernameError)}
              </FieldError>
            )}
          </Field>

          {/* Password */}
          <Field className="space-y-2" data-invalid={!!passwordError}>
            <FieldLabel htmlFor="password">{tUI("password_label")}</FieldLabel>

            <div className="relative">
              <LockKeyhole
                className="
                  pointer-events-none absolute start-3 top-1/2
                  size-4 -translate-y-1/2
                  text-muted-foreground
                "
              />

              <Input
                id="password"
                type="password"
                placeholder={tUI("password_placeholder")}
                className="
                  h-11 rounded-xl
                  border-border/60
                  bg-background/70
                  ps-10
                "
                {...register("password")}
                aria-invalid={!!passwordError}
              />
            </div>

            {passwordError && (
              <FieldError className="text-xs">
                {tValidation(passwordError)}
              </FieldError>
            )}
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            className="
              mt-2 h-11 w-full rounded-xl
              cursor-pointer
              text-sm font-medium
              shadow-sm
            "
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />

                <span>{tUI("loading")}</span>
              </div>
            ) : (
              tUI("login_button")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

export const LoginForm = () => {
  const navigate = useNavigate();
  const mutation = useLogin();

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
    mutation.mutate(
      { username: values.username, password: values.password },
      {
        onSuccess: () => navigate("/"),
      },
    );
  };

  const usernameError = errors.username?.message;
  const passwordError = errors.password?.message;

  return (
    <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {tUI("login_button")}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div className="space-y-1.5">
          <Input
            placeholder={tUI("username_placeholder")}
            {...register("username")}
          />
          {usernameError && (
            <p className="text-xs text-destructive">
              {tValidation(usernameError)}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Input
            type="password"
            placeholder={tUI("password_placeholder")}
            {...register("password")}
          />
          {passwordError && (
            <p className="text-xs text-destructive">
              {tValidation(passwordError)}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? tUI("loading") : tUI("login_button")}
        </Button>
      </form>
    </div>
  );
};

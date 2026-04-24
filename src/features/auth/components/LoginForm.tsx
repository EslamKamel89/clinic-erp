import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder={tUI("username_placeholder")}
        {...register("username")}
      />
      {usernameError && <p>{tValidation(usernameError)}</p>}
      <input
        type="password"
        placeholder={tUI("password_placeholder")}
        {...register("password")}
      />
      {passwordError && <p>{tValidation(passwordError)}</p>}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? tUI("loading") : tUI("login_button")}
      </button>
    </form>
  );
};

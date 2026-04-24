import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../features/auth/components/LoginForm";
import { useLogin } from "../../../features/auth/hooks/useLogin";

export const LoginPage = () => {
  const mutation = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/");
    }
  }, [mutation.isSuccess]);
  return (
    <div>
      <LoginForm mutation={mutation} />
    </div>
  );
};

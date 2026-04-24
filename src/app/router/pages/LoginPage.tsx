import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../features/auth/hooks/useLogin";

export const LoginPage = () => {
  const navigate = useNavigate();
  // i manually tested the login flow to make sure that every thing is working, later this will be removed
  const mutation = useLogin();
  const handleTestLogin = () => {
    mutation.mutate(
      { username: "s", password: "1" },
      {
        onSuccess: () => navigate("/"),
      },
    );
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => handleTestLogin()}>Click me</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to App
      </button>
    </div>
  );
};

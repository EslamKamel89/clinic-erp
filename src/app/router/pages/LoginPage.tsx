import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login Page</h1>

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

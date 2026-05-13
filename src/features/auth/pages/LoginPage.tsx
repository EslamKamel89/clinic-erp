import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";

import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const mutation = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/");
    }
  }, [mutation.isSuccess]);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm">
          <ShieldCheck className="size-8" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Sign in to continue managing your clinic operations
          </p>
        </div>
      </div>

      {/* Form */}
      <LoginForm mutation={mutation} />
    </div>
  );
};

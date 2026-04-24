import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setToken = useAuthStore((s) => s.setToken);
  const logout = () => {
    setToken(null);
    queryClient.clear();
    navigate("/login");
  };
  return { logout };
}

import { create } from "zustand";
import {
  clearTokenStorage,
  getInitialToken,
  setTokenStorage,
} from "../../../shared/lib/storage/helpers";
type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (token) {
      setTokenStorage(token);
    } else {
      clearTokenStorage();
    }

    set({ token });
  },
}));

import axios from "axios";
import { useAuthStore } from "../../../features/auth/store/auth.store";
import { API_BASE_URL } from "../config/api";
import i18n from "../localization/i18n";
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const language = i18n.language;
  if (language) {
    config.headers["Accept-Language"] = language;
  }
  return config;
});

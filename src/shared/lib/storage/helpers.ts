import { storageKeys } from "./keys";

export function getInitialToken(): string | null {
  return localStorage.getItem(storageKeys.token);
}

export function setTokenStorage(token: string) {
  localStorage.setItem(storageKeys.token, token);
}

export function clearTokenStorage() {
  localStorage.removeItem(storageKeys.token);
}

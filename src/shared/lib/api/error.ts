import axios from "axios";

export class AppError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.Message ||
      error?.message ||
      "Something went wrong";
    return new AppError(message, error.code);
  }
  if (error instanceof Error) {
    return new AppError(error.message);
  }
  return new AppError("Something went wrong");
}

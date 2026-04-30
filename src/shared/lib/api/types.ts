export type ApiResponse<T> = {
  Result: boolean;
  Message: string;
  data: T;
};

export type ApiResponse<T> = {
  Result: boolean;
  Message: string;
  data: T;
};

export type SelectOption = {
  value: number;
  label: string;
};

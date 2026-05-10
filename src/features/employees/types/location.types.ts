import type { SelectOption } from "@/shared/lib/api/types";

export type StatesResponse = {
  Result: boolean;

  Message: string;

  States: SelectOption[];
};

export type CitiesResponse = {
  Result: boolean;

  Message: string;

  Cities: SelectOption[];
};

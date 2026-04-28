export type BackendPaginationRawResponse<T> = {
  Result: boolean;
  Message: string;
  data: T[];
  total: number;
  current_page: number;
};
export type PaginationLink = {
  queryParam: string;
  label: string;
  active: boolean;
};
export type PaginatedResponse<T> = {
  currentPage: number;
  data: T[];
  links: PaginationLink[];
  nextPageParam: string | null;
  prevPageParam: string | null;
  total: number;
};

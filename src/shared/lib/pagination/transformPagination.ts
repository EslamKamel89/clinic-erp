import type {
  BackendPaginationRawResponse,
  PaginatedResponse,
  PaginationLink,
} from "./types";

export function transformPagination<T>(
  response: BackendPaginationRawResponse<T>,
): PaginatedResponse<T> {
  const { current_page: currentPage, total, data } = response;
  const links: PaginationLink[] = [];
  for (let page = 1; page <= total; page++) {
    links.push({
      queryParam: `page=${page}`,
      label: String(page),
      active: page === currentPage,
    });
  }
  const nextPageParam = currentPage < total ? `page=${currentPage + 1}` : null;
  const prevPageParam = currentPage > 1 ? `page=${currentPage - 1}` : null;
  return {
    currentPage,
    data,
    links,
    nextPageParam,
    prevPageParam,
    total,
  };
}

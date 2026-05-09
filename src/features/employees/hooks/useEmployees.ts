import type { AppError } from "@/shared/lib/api/error";
import { transformPagination } from "@/shared/lib/pagination/transformPagination";
import type { PaginatedResponse } from "@/shared/lib/pagination/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { employeeIndexApi } from "../api/employeeIndex.api";
import { serializeEmployeeIndexResponse } from "../serializers/employeeIndex.serializer";
import type { Employee } from "../types/employee.types";

type Props = {
  page: number;
  limit: number;
};

export const useEmployees = ({ page, limit }: Props) => {
  const {
    data: pagination,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Employee>, AppError>({
    queryKey: queryClientKeys.employees.index(page, limit),
    queryFn: async () => {
      const response = await employeeIndexApi(page, limit);
      const data = serializeEmployeeIndexResponse(response.data);
      return transformPagination<Employee>({
        ...response,
        data,
      });
    },
    staleTime: Infinity,
  });
  return {
    items: pagination?.data,
    currentPage: pagination?.currentPage,
    total: pagination?.total,

    isLoading,
    isError,
  };
};

import type { AppError } from "@/shared/lib/api/error";
import { transformPagination } from "@/shared/lib/pagination/transformPagination";
import type { PaginatedResponse } from "@/shared/lib/pagination/types";
import { queryClientKeys } from "@/shared/lib/query/keys";
import { useQuery } from "@tanstack/react-query";
import { doctorIndexApi } from "../api/doctorIndex.api";
import { serializeDoctorIndexResponse } from "../serializers/doctorIndex.serializer";
import type { Doctor } from "../types/doctor.types";

type Props = {
  page: number;
  limit: number;
};

export const useDoctors = ({ page, limit }: Props) => {
  const {
    data: pagination,
    isLoading,
    isError,
  } = useQuery<PaginatedResponse<Doctor>, AppError>({
    queryKey: queryClientKeys.doctors.index(page, limit),
    queryFn: async () => {
      const response = await doctorIndexApi(page, limit);
      const data = serializeDoctorIndexResponse(response.data);
      return transformPagination<Doctor>({
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

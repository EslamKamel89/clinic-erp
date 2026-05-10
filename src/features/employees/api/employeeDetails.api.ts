import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { EmployeeDetailsResponseRaw } from "../types/employeeDetails.types";

export async function employeeDetailsApi(
  id: number,
): Promise<EmployeeDetailsResponseRaw> {
  try {
    const res = await apiClient.get<EmployeeDetailsResponseRaw>(
      API_ENDPOINTS.employeeById(id),
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

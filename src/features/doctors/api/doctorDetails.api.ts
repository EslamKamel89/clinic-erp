import { apiClient } from "@/shared/lib/api/client";
import { normalizeApiError } from "@/shared/lib/api/error";
import { API_ENDPOINTS } from "@/shared/lib/config/api";
import type { DoctorDetailsResponseRaw } from "../types/doctorDetails.types";

export async function doctorDetailsApi(
  id: number,
): Promise<DoctorDetailsResponseRaw> {
  try {
    const res = await apiClient.get<DoctorDetailsResponseRaw>(
      API_ENDPOINTS.doctorById(id),
    );
    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

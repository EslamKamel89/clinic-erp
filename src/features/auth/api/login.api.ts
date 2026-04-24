import axios from "axios";
import { API_BASE_URL } from "../../../shared/lib/config/api";
import type { LoginResponseRaw } from "../types/auth.types";
export async function loginApi(
  username: string,
  password: string | number,
): Promise<LoginResponseRaw> {
  const response = await axios.post<LoginResponseRaw>(
    `${API_BASE_URL}/api/userlogin`,
    {
      username,
      password,
    },
  );
  return response.data;
}

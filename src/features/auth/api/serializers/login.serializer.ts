import { getDirection } from "../../../../shared/lib/localization/getDirection";
import type {
  AuthModel,
  Language,
  LoginResponseRaw,
  MenuItem,
  RawMenuItem,
} from "../../types/auth.types";

export function serializeLoginResponse(raw: LoginResponseRaw): AuthModel {
  const data = raw.Data;
  const user = {
    id: data.User_ID,
    username: data.User_Name,
    name: data.Emp_Name,
    branchName: data.Branch_Name,
    companyName: data.Company_Name,
  };
  const token = data.Authorization;
  const language = mapLanguage(data.lang);
  const direction = getDirection(language);
  const menu = normalizeMenu(raw.menu);
  return {
    user,
    token,
    menu,
    language,
    direction,
  };
}

function normalizeMenu(items: RawMenuItem[]): MenuItem[] {
  return items.map((item) => ({
    label: item.menu_name,
    icon: item.icon,
    path: item.pagelink?.trim(),
    children: item?.children ? normalizeMenu(item.children) : undefined,
  }));
}

function mapLanguage(lang: string): Language {
  if (lang === "ar" || lang === "en") return lang;
  return "en";
}

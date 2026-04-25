// src/features/localization/components/LanguageSwitcher.tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useLocalization } from "../../../shared/lib/localization/useLocalization";
import type { Language } from "../../auth/types/auth.types";
import { useChangeLanguage } from "../hooks/useChangeLanguage";

export const LanguageSwitcher = () => {
  const { t, i18n } = useLocalization("p000");
  const currentLang = i18n.language;
  const { changeLanguage, isLoading } = useChangeLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">🌐</span>

      <Select
        value={currentLang}
        onValueChange={(v) => changeLanguage(v as Language)}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder={t("common.language")} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground">
              {t("common.language")}
            </SelectLabel>

            <SelectItem value="ar">🇪🇬 {t("common.arabic")}</SelectItem>
            <SelectItem value="en">🇺🇸 {t("common.english")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

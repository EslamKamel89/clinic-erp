// src/features/localization/components/LanguageSwitcher.tsx

import { Languages } from "lucide-react";

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
      {/* Icon */}
      <div
        className="
          flex size-8 items-center justify-center
          rounded-lg
          border border-border/60
          bg-muted/40
          text-muted-foreground
        "
      >
        <Languages className="size-4" />
      </div>

      {/* Select */}
      <Select
        value={currentLang}
        onValueChange={(v) => changeLanguage(v as Language)}
        disabled={isLoading}
      >
        <SelectTrigger
          className="
            h-9 w-[170px]
            rounded-xl
            border-border/60
            bg-card/60
            shadow-sm
            backdrop-blur-sm

            hover:bg-accent/40
            transition-colors
          "
        >
          <SelectValue placeholder={t("common.language")} />
        </SelectTrigger>

        <SelectContent
          className="
            rounded-2xl
            border border-border/60
            bg-popover/95
            shadow-xl
            backdrop-blur-xl
          "
        >
          <SelectGroup>
            <SelectLabel
              className="
                px-2 py-1.5
                text-[11px]
                font-semibold uppercase tracking-wide
                text-muted-foreground
              "
            >
              {t("common.language")}
            </SelectLabel>

            <SelectItem
              value="ar"
              className="
                rounded-xl
                py-2
                transition-colors
                focus:bg-accent/60
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🇪🇬</span>

                <span>{t("common.arabic")}</span>
              </div>
            </SelectItem>

            <SelectItem
              value="en"
              className="
                rounded-xl
                py-2
                transition-colors
                focus:bg-accent/60
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🇺🇸</span>

                <span>{t("common.english")}</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

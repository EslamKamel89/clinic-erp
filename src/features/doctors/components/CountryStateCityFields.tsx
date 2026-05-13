import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TText } from "@/shared/components/localization/TText";
import type { SelectOption } from "@/shared/lib/api/types";
import { useLocalization } from "@/shared/lib/localization/useLocalization";
import { useCities } from "../hooks/useCities";
import { useStates } from "../hooks/useStates";

type Props = {
  disabled?: boolean;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;

  countries: SelectOption[];

  onCountryChange: (countryId: number | null) => void;
  onStateChange: (stateId: number | null) => void;
  onCityChange: (cityId: number | null) => void;
};

export const CountryStateCityFields = ({
  disabled,
  countryId,
  stateId,
  cityId,
  countries,
  onCountryChange,
  onStateChange,
  onCityChange,
}: Props) => {
  const { t } = useLocalization("p009");
  const statesQuery = useStates(countryId);

  const citiesQuery = useCities(stateId);

  const handleCountryChange = (value: string) => {
    const parsed = Number(value);
    onCountryChange(parsed);
    onStateChange(null);
    onCityChange(null);
  };

  const handleStateChange = (value: string) => {
    const parsed = Number(value);
    onStateChange(parsed);
    onCityChange(null);
  };
  const handleCityChange = (value: string) => {
    const parsed = Number(value);
    onCityChange(parsed);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Country */}
      <div className="space-y-2">
        <TText ns="p009" k="country" width={8} />
        <Select
          disabled={disabled}
          value={countryId?.toString() ?? ""}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("select_country")} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value.toString()}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <TText ns="p009" k="state" width={8} />

        {/* State */}
        <Select
          disabled={disabled || !countryId}
          value={stateId?.toString() ?? ""}
          onValueChange={handleStateChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("select_state")} />
          </SelectTrigger>

          <SelectContent>
            {(statesQuery.data ?? []).map((state) => (
              <SelectItem key={state.value} value={state.value.toString()}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <TText ns="p009" k="city" width={8} />

        <Select
          disabled={disabled || !stateId}
          value={cityId?.toString() ?? ""}
          onValueChange={handleCityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("select_city")} />
          </SelectTrigger>

          <SelectContent>
            {(citiesQuery.data ?? []).map((city) => (
              <SelectItem key={city.value} value={city.value.toString()}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

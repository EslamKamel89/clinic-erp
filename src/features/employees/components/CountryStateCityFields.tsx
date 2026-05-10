import type { SelectOption } from "@/shared/lib/api/types";
import { useCities } from "../hooks/useCities";
import { useStates } from "../hooks/useStates";

type Props = {
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;

  countries: SelectOption[];

  onCountryChange: (countryId: number | null) => void;
  onStateChange: (stateId: number | null) => void;
  onCityChange: (cityId: number | null) => void;
};

export const CountryStateCityFields = ({
  countryId,
  stateId,
  cityId,
  countries,
  onCountryChange,
  onStateChange,
  onCityChange,
}: Props) => {
  const statesQuery = useStates(countryId);

  const citiesQuery = useCities(stateId);

  const handleCountryChange = (value: number | null) => {
    onCountryChange(value);

    onStateChange(null);

    onCityChange(null);
  };

  const handleStateChange = (value: number | null) => {
    onStateChange(value);

    onCityChange(null);
  };

  return <div>TODO</div>;
};

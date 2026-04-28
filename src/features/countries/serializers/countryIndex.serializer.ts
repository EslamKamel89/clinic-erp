import type { Country, CountryRaw } from "../types/country.types";

export const serializeCountryIndexResponse = (
  countriesRaw: CountryRaw[],
): Country[] => {
  return countriesRaw.map((c) => ({
    id: c.ID,
    name: c.Obj_Name,
    phoneCode: c.PhoneCode,
    notes: c.Notes,
  }));
};

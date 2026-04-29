import { useCountries } from "../../../../features/countries/hooks/useCountries";

export const CountryIndexPage = () => {
  const { data } = useCountries({ page: 1, limit: 10 });
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

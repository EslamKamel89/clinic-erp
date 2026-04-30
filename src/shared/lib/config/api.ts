export const API_BASE_URL = "http://behaaasamir-001-site1.mtempurl.com";
export const API_ENDPOINTS = {
  login: "/api/userlogin",
  me: "/api/me",
  changeLanguage: "/api/changeuserlang",
  countryIndex: "/api/countries",
  countryCreate: "/api/countries",
  countryUpdate: (id: number) => `/api/countries/${id}`,
  countryDelete: (id: number) => `/api/countries/${id}`,
};

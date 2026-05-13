export const API_BASE_URL = "http://behaaasamir-001-site1.mtempurl.com";
export const API_ENDPOINTS = {
  login: "/api/userlogin",
  me: "/api/me",
  changeLanguage: "/api/changeuserlang",
  // country
  countryIndex: "/api/countries",
  countryCreate: "/api/countries",
  countryUpdate: (id: number) => `/api/countries/${id}`,
  countryDelete: (id: number) => `/api/countries/${id}`,
  // employee
  employeesIndex: "/api/employees",
  employeeById: (id: number) => `/api/employees/${id}`,
  employeeCreate: "/api/employees",
  employeeUpdate: (id: number) => `/api/employees/${id}`,
  employeeDelete: (id: number) => `/api/employees/${id}`,
  // doctor
  doctorsIndex: "/api/doctors",
  doctorById: (id: number) => `/api/doctors/${id}`,
  doctorCreate: "/api/doctors",
  doctorUpdate: (id: number) => `/api/doctors/${id}`,
  doctorDelete: (id: number) => `/api/doctors/${id}`,
  // city and state
  states: "/api/states",
  cities: "/api/cities",
  // translations
  translations: "/api/translations",
};

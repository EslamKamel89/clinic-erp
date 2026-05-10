export const appRoutes = {
  home: "/",
  auth: {
    login: "/login",
  },
  country: {
    index: "/main-data/countries",
  },
  employee: {
    index: "/main-data/employees",
    create: "/main-data/employees/create",
    showTemplate: "/main-data/employees/:id",
    editTemplate: "/main-data/employees/:id/edit",
    show: (id: number) => `/main-data/employees/${id}`,
    edit: (id: number) => `/main-data/employees/${id}/edit`,
  },
  city: {
    index: "/main-data/cities",
  },
  state: {
    index: "/main-data/states",
  },
  language: {
    index: "/main-data/languages",
  },
};

export const queryClientKeys = {
  auth: {
    main: ["auth"],
    user: ["auth", "user"],
    menu: ["auth", "menu"],
    session: ["auth", "session"],
    permissions: ["auth", "permissions"],
  },
  countries: {
    main: ["countries"],
    index(page: number, limit: number) {
      return ["countries", page, limit];
    },
  },
  employees: {
    main: ["employees"],
    index(page: number, limit: number) {
      return ["employees", page, limit];
    },
    details(id: number) {
      return ["employees", "details", id];
    },
  },
  doctors: {
    main: ["doctors"],
    index(page: number, limit: number) {
      return ["doctors", page, limit];
    },
    details(id: number) {
      return ["doctors", "details", id];
    },
  },
  dropdownData: {
    states(countryId: number) {
      return ["dropdownData", "states", countryId];
    },
    cities(stateId: number) {
      return ["dropdownData", "cities", stateId];
    },
  },
  localization: {
    main: ["localization"],
    namespace(language: string, namespace: string) {
      return ["localization", language, namespace];
    },
  },
};

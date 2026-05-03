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
      return [...queryClientKeys.countries, page, limit];
    },
  },
  localization: {
    main: ["localization"],
    namespace(language: string, namespace: string) {
      return [...queryClientKeys.localization.main, language, namespace];
    },
  },
};

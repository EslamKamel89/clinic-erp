export const queryClientKeys = {
  auth: {
    user: ["auth", "user"],
    menu: ["auth", "menu"],
    session: ["auth", "session"],
  },
  countries: {
    index(page: number, limit: number) {
      return ["countries", page, limit];
    },
  },
};

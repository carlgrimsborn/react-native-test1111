export const setAuth = (authenticated: boolean) => {
  return {
    type: "SET_AUTH",
    authenticated: authenticated,
  };
};

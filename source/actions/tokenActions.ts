export const setToken = (token: string) => {
  return {
    type: "CHANGE_TOKEN",
    token: token,
  };
};

export const cleanToken = () => {
  return {
    type: "CLEAN_TOKEN",
  };
};

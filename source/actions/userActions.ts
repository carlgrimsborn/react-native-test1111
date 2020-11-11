import { User } from "../rootReducer";

export const changeUser = (user: User) => {
  return {
    type: "CHANGE_USER",
    user: user,
  };
};

export const cleanUser = () => {
  return {
    type: "CLEAN_USER",
  };
};

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: {
    streetName: string;
    city: string;
    zipCode: string;
  };
  buddyInfo: {
    description: string;
    favQuote: string;
    favThing: string;
  };
  profilePictureUrl: string;
}

export interface ReduxState {
  user: User;
  authenticated: boolean;
  token: string;
}

const initstate: ReduxState = {
  user: {
    id: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: {
      streetName: "",
      city: "",
      zipCode: "",
    },
    profilePictureUrl: "",
    buddyInfo: {
      description: "",
      favQuote: "",
      favThing: "",
    },
  },
  authenticated: false,
  token: "",
};

export const rootReducer = (state: ReduxState = initstate, action: any) => {
  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user,
      },
    };
  }
  if (action.type === "CHANGE_TOKEN") {
    return {
      ...state,
      token: action.token,
    };
  }
  if (action.type === "CLEAN_TOKEN") {
    return {
      ...state,
      token: "",
    };
  }
  if (action.type === "CLEAN_USER") {
    return {
      ...state,
      ...initstate,
    };
  }
  if (action.type === "SET_AUTH") {
    return {
      ...state,
      authenticated: action.authenticated,
    };
  }
  return state;
};

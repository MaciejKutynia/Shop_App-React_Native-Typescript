import { AnyAction } from "redux";

export const loginReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case "LOGIN_USER":
      let formIsValid = true;
      const values = {
        ...state.values,
        [action.input]: action.value,
      };
      const validities = {
        ...state.validities,
        [action.input]: action.isValid,
      };
      for (const key in validities) {
        formIsValid = formIsValid && validities[key];
      }
      return {
        ...state,
        formIsValid,
        values,
        validities,
      };
    default:
      return state;
  }
};

export const reducerState = {
  values: {
    email: "",
    password: "",
  },
  validities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

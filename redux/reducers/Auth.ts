import { AnyAction } from "redux";
import { SIGN_IN, TRY_AUTO_LOGIN } from "../constants/Auth";
import AuthTypes from "../types/Auth";

const initialState: AuthTypes = {
  token: "",
  userID: "",
  isAL: false,
  registerSuccess: false,
  allowBiometric: false,
  askBiometric: false,
  enableNotifications: false,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        userID: action.id,
        askBiometric: action.short ? false : true,
      };
    case TRY_AUTO_LOGIN:
      return {
        ...state,
        isAL: action.isAL,
        token: action.token,
        userID: action.id,
      };
    default:
      return state;
  }
};

export default authReducer;

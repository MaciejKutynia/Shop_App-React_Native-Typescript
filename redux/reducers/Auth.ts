import { AnyAction } from "redux";
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
    default:
      return state;
  }
};

export default authReducer;

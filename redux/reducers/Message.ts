import { AnyAction } from "redux";
import { HIDE_MESSAGE, SHOW_MESSAGE } from "../constants/Message";
import { MessageTypes } from "../types/Message";

const initialState: MessageTypes = {
  message: "",
  shown: false,
  isError: false,
  isWarning: false,
  okText: "",
  cancelText: "",
  cancelButtonHandler: null,
  okButtonHandler: null,
  isHideByTimer: true,
  timer: 2000,
};

const messageReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.msg,
        isError: action.isError || false,
        isWarning: action.isWarning || false,
        shown: true,
        isHideByTimer: action.isHideByTimer || true,
        timer: action.timer || 2000,
        cancelButtonHandler: action.cancelButtonHandler || null,
        okButtonHandler: action.okButtonHandler || null,
        okText: action.okText || "",
        cancelText: action.cancelText || "",
      };
    case HIDE_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;

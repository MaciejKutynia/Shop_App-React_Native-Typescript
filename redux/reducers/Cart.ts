import { AnyAction } from "redux";
import { LOGOUT } from "../constants/Auth";
import { CHANGE_CART } from "../constants/Cart";

const initailState = {
  total: 0,
  order: [],
  quantity: 0,
};

const cartReducer = (state = initailState, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_CART:
      return {
        ...state,
        total: action.total,
        quantity: action.quantity,
        order: action.order,
      };
    case LOGOUT:
      return initailState;
    default:
      return state;
  }
};

export default cartReducer;

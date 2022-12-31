import { combineReducers } from "redux";

import Auth from "./Auth";
import Cart from "./Cart";
import Message from "./Message";
import Theme from "./Theme";

const rootReducer = combineReducers({
  Auth,
  Cart,
  Message,
  Theme,
});

export default rootReducer;

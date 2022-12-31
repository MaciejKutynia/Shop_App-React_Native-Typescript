import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const initialStore = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
  preloadedState: initialStore,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

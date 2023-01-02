import { Dispatch } from "react";
import StoreInitialState from "../types";

export const changeCart =
  (order: any) =>
  async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    console.log(order);
  };

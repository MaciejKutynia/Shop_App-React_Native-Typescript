import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch } from "redux";
import { SIGN_IN } from "../constants/Auth";
import { SHOW_MESSAGE } from "../constants/Message";

import { backendURL } from "../../utils";
import { SubmitData } from "../../types/screen/auth/Login";

export const signIn = (data: SubmitData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`${backendURL}/user/login`, { data });
    dispatch({
      type: SIGN_IN,
      token: res?.data?.token,
      id: res?.data?.id,
    });
    const token = res?.data?.token;
    await AsyncStorage.setItem(
      "loginData",
      JSON.stringify({ token, id: res?.data?.id }),
    );
    await AsyncStorage.setItem("biometricToken", res?.data?.biometricToken);
  } catch (error) {
    dispatch({
      type: SHOW_MESSAGE,
      msg: error?.response?.data?.msg,
      isError: true,
    });
  }
};

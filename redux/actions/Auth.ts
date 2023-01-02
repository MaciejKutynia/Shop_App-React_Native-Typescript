import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dispatch } from "redux";
import { LOGOUT, SIGN_IN, TRY_AUTO_LOGIN } from "../constants/Auth";
import { SHOW_MESSAGE } from "../constants/Message";

import { backendURL } from "../../utils";
import { SubmitData } from "../../types/screen/auth/Login";

export const signIn = (data: SubmitData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`${backendURL}/api/user/login`, { data });
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
      timer: 2000,
    });
    dispatch({ type: LOGOUT });
  }
};

export const tryAutoLogin = () => async (dispatch: Dispatch) => {
  const loginData = await AsyncStorage.getItem("loginData");
  try {
    const token = loginData && JSON.parse(loginData)?.token;
    if (!token) return;
    const res = await axios.get(`${backendURL}/api/user/verify`, {
      headers: { "x-auth-token": token },
    });
    dispatch({
      type: TRY_AUTO_LOGIN,
      isAL: res.data.success,
      token: token,
      id: JSON.parse(loginData)?.id || null,
    });
  } catch (error) {
    if (error?.response?.status === 401 && loginData) {
      await AsyncStorage.removeItem("loginData");
    }
    dispatch({ type: LOGOUT });
  }
};

export const biometricLogin =
  (token: string | null) => async (dispatch: Dispatch) => {
    if (token) {
      const res = await axios.post(`${backendURL}/api/user/biometric`, {
        token,
      });
      await AsyncStorage.setItem(
        "loginData",
        JSON.stringify({ token, id: res.data.id }),
      );
      dispatch({
        type: SIGN_IN,
        token: res.data?.token,
        id: res.data?.id || null,
        short: true,
      });
    }
  };

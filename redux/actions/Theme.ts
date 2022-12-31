import { Dispatch } from "redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import * as Localization from "expo-localization";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hasHardwareAsync, isEnrolledAsync } from "expo-local-authentication";

import {
  GET_THEME,
  GET_LOCALE,
  GET_COLORS,
  SET_LOADING,
} from "../constants/Theme";
import { useDispatch } from "react-redux";
import Colors, { getColors } from "../../assets/Colors";
import StoreInitialState from "../types";
import { SHOW_MESSAGE } from "../constants/Message";
import { backendURL } from "../../utils";

export const getTheme = () => async (dispatch: Dispatch) => {
  const theme =
    (await AsyncStorage.getItem("theme")) || Appearance.getColorScheme();
  dispatch({ type: GET_THEME, theme });
};

export const getLocale = () => async (dispatch: Dispatch) => {
  const locale =
    (await AsyncStorage.getItem("locale")) ||
    Localization.locale.split("-")?.[0];
  const language = await dispatch(changeLanguage() as any);
  dispatch({ type: GET_LOCALE, locale, language });
};

export const changeLanguage =
  () => async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    const locale = getState().Theme.locale;
    try {
      const res = await axios.post(`${backendURL}/settings/language`, {
        locale,
      });
      return res?.data;
    } catch (error) {
      dispatch({
        type: SHOW_MESSAGE,
        msg: error?.response?.data?.msg,
        isError: true,
      });
    }
  };

export const getThemeColors =
  () => async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    const theme = getState().Theme.theme;
    const colors = getColors(Colors, theme);
    dispatch({ type: GET_COLORS, colors });
  };

export const setLoading = (state: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_LOADING,
    state,
  });
};

export const allowBiometric =
  (status: boolean) => async (dispatch: Dispatch) => {
    const biometricExists = await hasHardwareAsync();
    const biometricsEnabled = await isEnrolledAsync();
    if (biometricExists && biometricsEnabled) {
      await AsyncStorage.setItem("biometric", JSON.stringify(status));
    } else {
      dispatch({
        type: SHOW_MESSAGE,
        msg: "Logowanie biometryczne jest niedostępne na tym telefonie",
        isError: true,
        timer: 3000,
      });
    }
    console.log({ biometricExists }, { biometricsEnabled }, { status });
  };

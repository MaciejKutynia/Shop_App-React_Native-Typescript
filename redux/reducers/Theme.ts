import { AnyAction } from "redux";
import {
  GET_THEME,
  GET_LOCALE,
  GET_COLORS,
  CHANGE_CURRENCY,
  SET_LOADING,
} from "../constants/Theme";
import { Appearance } from "react-native";
import * as Localization from "expo-localization";
import ThemeTypes from "../types/Theme";
import pl_PL from "../../i18n/pl_PL";

const initialState: ThemeTypes = {
  theme: Appearance.getColorScheme() || "",
  locale: Localization?.locale?.split("-")?.[0],
  colors: {},
  currency: "zł",
  currencyRatio: 1,
  loading: true,
  messages: pl_PL,
};

const themeReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case GET_LOCALE:
      return {
        ...state,
        locale: action.locale,
        language: action.language,
      };
    case GET_COLORS:
      return {
        ...state,
        colors: action.colors,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
        currencyRation: action.currencyRatio,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.state,
      };
    default:
      return state;
  }
};

export default themeReducer;

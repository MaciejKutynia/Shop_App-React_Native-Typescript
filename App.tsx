import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import * as Localization from "expo-localization";
import "react-native-gesture-handler";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { IntlProvider } from "react-intl";

import AppNavigator from "./navigation/AppNavigator";
import StatusBar from "./utils/components/StatusBar";
import Message from "./utils/components/Message";

import store from "./redux";
import {
  getLocale,
  getTheme,
  getThemeColors,
  setLoading,
} from "./redux/actions/Theme";
import globalStyles from "./assets/styles/global";
import { ThemeInterface } from "./assets/Colors";
import { tryAutoLogin } from "./redux/actions/Auth";

const ShopApp: React.FC = () => {
  const dispatch = useAppDispatch();

  //THEME
  const theme = useAppSelector((state) => state.Theme.theme);
  const colors = useAppSelector((state) => state.Theme.colors);
  const locale = useAppSelector((state) => state.Theme.locale);
  const messages = useAppSelector((state) => state.Theme.messages);
  const isLoading = useAppSelector((state) => state.Theme.loading);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setLoading(true) as any);
    }
    (async () => {
      await dispatch(getThemeColors() as any);
    })();
    dispatch(setLoading(false) as any);
  }, [theme]);

  useEffect(() => {
    (async () => {
      await dispatch(tryAutoLogin() as any);
      await dispatch(getLocale() as any);
      await dispatch(getTheme() as any);
    })();
    dispatch(setLoading(false) as any);
  }, []);

  if (isLoading)
    return (
      <View style={globalStyles(colors).screen}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <IntlProvider locale={locale} defaultLocale="pl" messages={messages}>
      <View style={appStyles(colors).screen}>
        <Message />
        <StatusBar />
        <AppNavigator />
      </View>
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
    </IntlProvider>
  );
};

const appStyles = (colors: ThemeInterface) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
  });

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ShopApp />
    </Provider>
  );
};

export default App;

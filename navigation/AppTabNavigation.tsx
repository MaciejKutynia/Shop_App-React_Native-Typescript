import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIntl } from "react-intl";
import { useAppSelector } from "../hooks/redux";

import { Feather, AntDesign } from "@expo/vector-icons";

import ShopNavigation from "./shop";
import SettingsScreen from "../screen/settings";
import AuthNavigation from "./auth";

import { ThemeInterface } from "../assets/Colors";

const Navigator = createBottomTabNavigator();

const AppTabNavigation: React.FC = () => {
  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  const { formatMessage } = useIntl();

  const defaultTabOptions = {
    headerShown: false,
    tabBarActiveTintColor: colors.secondary,
    tabBarInactiveTintColor: colors.gray,
    tabBarActiveBackgroundColor: colors.primary,
    tabBarInactiveBackgroundColor: colors.primary,
  };

  const defaultStackOptions: StackOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.secondary,
  };

  return (
    <Navigator.Navigator screenOptions={defaultTabOptions}>
      <Navigator.Screen
        name="Default"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
          tabBarLabel: "Shop",
        }}>
        {(props) => <ShopNavigation stackOptions={defaultStackOptions} />}
      </Navigator.Screen>
      <Navigator.Screen
        name="Auth"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: formatMessage({
            id: "Login",
            defaultMessage: "Login",
          }),
        }}>
        {(props) => <AuthNavigation stackOptions={defaultStackOptions} />}
      </Navigator.Screen>
      <Navigator.Screen component={SettingsScreen} name='Settings' options={{
          tabBarIcon: ({color,size}) => (
              <Feather name='settings' color={color} size={size} />
          ),
          tabBarLabel: formatMessage({id: 'Settings', defaultMessage: 'Ustawienia'})
      }} />
    </Navigator.Navigator>
  );
};

export default AppTabNavigation;

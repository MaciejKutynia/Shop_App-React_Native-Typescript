import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../../assets/styles/global";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useIntl } from "react-intl";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SwitchComponent from "../../utils/components/Switch";

import { ThemeInterface } from "../../assets/Colors";
import { getTheme } from "../../redux/actions/Theme";
import { allowBiometric } from "../../redux/actions/Theme";

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);
  const theme = useAppSelector((state) => state.Theme.theme);

  const [isDark, setIsDark] = useState<boolean>(false);
  const [biometric, setBiometric] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const biometricData = (await AsyncStorage.getItem("biometric")) || false;
      const notificationData =
        (await AsyncStorage.getItem("notifications")) || false;
      setIsDark(theme === "dark");
      setBiometric(!!biometricData);
      setNotifications(!!notificationData);
    })();
  }, [theme, AsyncStorage]);

  const toggleSwitch = async (type: string) => {
    switch (type) {
      case "theme":
        setIsDark((prev) => !prev);
        await AsyncStorage.setItem("theme", !isDark ? "dark" : "light");
        await dispatch(getTheme() as any);
        break;
      case "biometric":
        setBiometric((prev) => !prev);
        await dispatch(allowBiometric(!biometric) as any);
        break;
      case "notifications":
        console.log("Notifications");
        break;
      default:
        return;
    }
  };

  return (
    <View
      style={{
        ...globalStyles(colors).screen,
        justifyContent: "flex-start",
      }}>
      <View style={styles(colors).headerContainer}>
        <Text style={styles(colors).headerText}>
          {formatMessage({ id: "Settings", defaultMessage: "Ustawienia" })}
        </Text>
      </View>
      <View style={styles(colors).settingsContainer}>
        <SwitchComponent
          icon={
            <Ionicons
              name="moon"
              size={22}
              color={colors.secondary}
              style={styles(colors).icon}
            />
          }
          id="theme"
          label={formatMessage({
            id: "Dark mode",
            defaultMessage: "Ciemny motyw",
          })}
          onChangeHandler={toggleSwitch}
          initial={isDark}
        />
        <SwitchComponent
          initial={biometric}
          icon={
            <Ionicons
              name="finger-print"
              size={22}
              color={colors.secondary}
              style={styles(colors).icon}
            />
          }
          id="biometric"
          label={formatMessage({
            id: "Biometric login",
            defaultMessage: "Logowanie biometryczne",
          })}
          onChangeHandler={toggleSwitch}
        />
        <SwitchComponent
          initial={notifications}
          icon={
            <MaterialCommunityIcons
              name="bell-check-outline"
              size={22}
              color={colors.secondary}
              style={styles(colors).icon}
            />
          }
          id="notifications"
          label={formatMessage({
            id: "Notifications",
            defaultMessage: "Powiadomienia",
          })}
          onChangeHandler={toggleSwitch}
        />
      </View>
    </View>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    headerContainer: {
      width: "100%",
      backgroundColor: colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray,
      paddingVertical: 10,
    },
    headerText: {
      color: colors.secondary,
      fontSize: 22,
      textAlign: "center",
      fontWeight: "500",
    },
    settingsContainer: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingVertical: 15,
      paddingHorizontal: 20,
      width: "100%",
    },
    icon: {
      marginRight: 10,
    },
  });

export default SettingsScreen;

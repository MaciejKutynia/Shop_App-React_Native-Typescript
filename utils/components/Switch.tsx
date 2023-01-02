import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemeInterface } from "../../assets/Colors";
import { useAppSelector } from "../../hooks/redux";

import Text from "./Text";

import { SwitchTypes } from "../../types/utils/Switch";

const SwitchComponent: React.FC<SwitchTypes> = (props) => {
  const { icon, id, initial, label, onChangeHandler } = props;

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  const [checked, setChecked] = useState<boolean>(initial || false);

  useEffect(() => {
    setChecked(initial || false);
  }, [initial]);

  const toggleHandler = () => {
    onChangeHandler(id);
    setChecked((prev) => !prev);
  };

  return (
    <View style={styles(colors).row}>
      <View style={styles(colors).labelContainer}>
        {icon}
        <Text style={styles(colors).labelText}>{label}</Text>
      </View>
      <Switch
        trackColor={{ false: "#e3dede", true: "#e3dede" }}
        thumbColor={checked ? colors.acceptColor : colors.rejectColor}
        ios_backgroundColor="#e3dede"
        onChange={toggleHandler}
        value={checked}
        style={styles(colors).labelSwitch}
      />
    </View>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    row: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
      marginVertical: 10,
    },
    labelContainer: {
      flexDirection: "row",
    },
    labelText: {
      fontWeight: "500",
      fontSize: 18,
      color: colors.secondary,
    },
    labelSwitch: {
      marginLeft: 10,
    },
  });

export default SwitchComponent;

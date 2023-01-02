import { StyleSheet, Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";

import { ThemeInterface } from "../../assets/Colors";
import { ReactNode } from "react";

const TextComponent = ({
  children,
  style: propStyles,
}: {
  children: ReactNode | string;
  style?: any;
}) => {
  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  return (
    <Text style={{ ...styles(colors).text, ...propStyles }}>{children}</Text>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    text: {
      fontSize: 13,
      color: colors.secondary,
    },
  });

export default TextComponent;

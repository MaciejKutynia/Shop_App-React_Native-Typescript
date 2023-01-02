import { StyleSheet } from "react-native";
import { ThemeInterface } from "../Colors";

const globalStyles = (colors: ThemeInterface) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    form: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    formText: {
      marginBottom: 30,
      color: colors.secondary,
    },
    formContainer: {
      marginBottom: 20,
      textAlign: "center",
      width: "100%",
      flexDirection: "row",
    },
    row: {
      flexDirection: "column",
      flexWrap: "wrap",
      width: "100%",
      alignItems: "center",
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.secondary,
      alignSelf: "center",
      borderRadius: 5,
    },
    buttonDisabled: {
      backgroundColor: colors.secondary + "80",
    },
    buttonText: {
      fontWeight: "bold",
      color: colors.primary,
    },
  });

export default globalStyles;

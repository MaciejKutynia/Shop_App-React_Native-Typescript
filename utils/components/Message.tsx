import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import globalStyles from "../../assets/styles/global";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { ThemeInterface } from "../../assets/Colors";
import { HIDE_MESSAGE } from "../../redux/constants/Message";

const Message: React.FC = () => {
  const dispatch = useAppDispatch();
  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  //MESSAGE
  const msg = useAppSelector((state) => state.Message.message);
  const isError = useAppSelector((state) => state.Message.isError);
  const isVisible = useAppSelector((state) => state.Message.shown);
  const okText = useAppSelector((state) => state.Message.okText);
  const cancelText = useAppSelector((state) => state.Message.cancelText);
  const okButtonHandler = useAppSelector(
    (state) => state.Message.okButtonHandler,
  );
  const cancelButtonHandler = useAppSelector(
    (state) => state.Message.cancelButtonHandler,
  );
  const timer = useAppSelector((state) => state.Message.timer);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch({ type: HIDE_MESSAGE });
      }, timer);
    }
  }, [isVisible]);

  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
    };
  });

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        opacity.value = 1;
      }, 300);
    } else {
      opacity.value = 0;
    }
  }, [isVisible]);

  return (
    <>
      <Animated.View
        style={[styles(colors).container, animatedStyles]}
        pointerEvents={isVisible ? "auto" : "none"}>
        <View style={styles(colors).textContainer}>
          <View style={styles(colors).icon}>
            {isError ? (
              <MaterialIcons
                name="error-outline"
                size={24}
                color={colors.redColor}
              />
            ) : (
              <AntDesign
                name="checkcircleo"
                size={24}
                color={colors.acceptColor}
              />
            )}
          </View>
          <Text>{msg}</Text>
        </View>
        <View style={styles(colors).textContainer}>
          {okText ? (
            <Pressable
              style={globalStyles(colors).button}
              onPress={okButtonHandler}>
              <Text style={globalStyles(colors).buttonText}>{okText}</Text>
            </Pressable>
          ) : null}
          {cancelText ? (
            <Pressable
              style={globalStyles(colors).button}
              onPress={cancelButtonHandler}>
              <Text style={globalStyles(colors).buttonText}>{cancelText}</Text>
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
      <Animated.View
        style={[styles(colors).layer, animatedStyles]}
        pointerEvents={isVisible ? "auto" : "none"}
      />
    </>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    layer: {
      position: "absolute",
      backgroundColor: `${colors.secondary}80`,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 2,
      opacity: 0,
    },
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [
        { translateY: -1 * (Dimensions.get("window").height / 5) },
        { translateX: -1 * (Dimensions.get("window").width / 3) },
      ],
      backgroundColor: colors.primary,
      width: "70%",
      height: "25%",
      borderRadius: 10,
      padding: 15,
      zIndex: 3,
      justifyContent: "flex-start",
      alignItems: "center",
      opacity: 0,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 5,
    },
  });

export default Message;

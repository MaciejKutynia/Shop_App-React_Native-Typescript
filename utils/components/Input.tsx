import React, { useEffect, useReducer } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { useAppSelector } from "../../hooks/redux";

import Text from "./Text";

import { ThemeInterface } from "../../assets/Colors";
import { AnyAction } from "redux";
import { ReducerTypes, InputTypes } from "../../types/utils/Input";
import validate from "../validate";

const reducer = (state: ReducerTypes, action: AnyAction) => {
  switch (action?.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        value: action?.value,
        isValid: action.isValid,
      };
    case "INPUT_BLUR":
      return {
        ...state,
        touched: action.touched,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputTypes> = (props) => {
  const { errorText, getData, id, label, style: propsStyle, ...rest } = props;

  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  const onBlurHandler = () => {
    dispatch({ type: "INPUT_BLUR", touched: true });
  };

  useEffect(() => {
    if (state.touched) {
      getData(id, state.value, props.required ? state.isValid : true);
    }
  }, [getData, id, state]);

  const onChangeHandler = (text: string) => {
    const isValid = validate(text, props);
    if (isValid) {
      dispatch({
        type: "INPUT_CHANGE",
        value: text,
        isValid,
      });
    }
  };

  return (
    <View style={{ ...styles(colors).inputContainer, ...propsStyle }}>
      <Text style={styles(colors).inputLabel}>{label}</Text>
      <TextInput
        onChangeText={onChangeHandler}
        onBlur={onBlurHandler}
        placeholderTextColor={colors.gray}
        style={{ ...propsStyle, ...styles(colors).input }}
        {...rest}
      />
      {!state.isValid && state.touched ? (
        <View style={styles(colors).errorContainer}>
          <Text style={styles(colors).errorText}>{errorText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    inputContainer: {
      marginHorizontal: 20,
      marginVertical: 5,
      width: Platform.OS === "ios" ? "40%" : "50%",
    },
    inputLabel: {
      marginVertical: 3,
      color: colors.secondary,
    },
    input: {
      marginVertical: 5,
      borderBottomColor: colors.secondary,
      borderBottomWidth: 1,
      color: colors.secondary,
      width: "100%",
      padding: 0,
    },
    errorContainer: {
      marginVertical: 5,
    },
    errorText: {
      color: colors.redColor,
      fontSize: 10,
    },
  });

export default Input;

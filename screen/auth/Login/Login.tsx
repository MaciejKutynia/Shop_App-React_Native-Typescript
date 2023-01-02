import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useIntl } from "react-intl";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { authenticateAsync } from "expo-local-authentication";

import Input from "../../../utils/components/Input";
import Text from "../../../utils/components/Text";

import globalStyles from "../../../assets/styles/global";

import { biometricLogin, signIn } from "../../../redux/actions/Auth";
import { loginReducer, reducerState } from "./useLogin";

import { ThemeInterface } from "../../../assets/Colors";
import { setLoading } from "../../../redux/actions/Theme";
import { LoginScreenProps } from "../../../types/navigation/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationStackList } from "../../../types/navigation/Auth";

const Login: React.FC<LoginScreenProps> = (props) => {
  const { navigation } = props;
  const appDispatch = useAppDispatch();

  const { formatMessage } = useIntl();

  const [biometricIsAvailable, setBiometricIsAvailable] =
    useState<boolean>(false);
  const [biometricLoginToken, setBiometricLoginToken] = useState<string | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const biometric = await AsyncStorage.getItem("biometric");
      const biometricAllowed = biometric && JSON.parse(biometric);
      const biometricToken = await AsyncStorage.getItem("biometricToken");
      setBiometricLoginToken(biometricToken || null);
      biometricAllowed && !!biometricToken
        ? setBiometricIsAvailable(true)
        : setBiometricIsAvailable(false);
    })();
  }, [AsyncStorage]);

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  const [state, dispatch] = useReducer(loginReducer, reducerState);

  const onChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatch({ type: "LOGIN_USER", value, isValid, input });
    },
    [dispatch],
  );

  const submitHandler = async () => {
    await appDispatch(setLoading(true) as any);
    await appDispatch(signIn(state.values) as any);
    await appDispatch(setLoading(false) as any);
  };

  const biometricLoginHandler = async () => {
    const data = await authenticateAsync();
    const { success } = data;
    if (success) {
      appDispatch(biometricLogin(biometricLoginToken) as any);
    }
  };

  if (biometricIsAvailable) {
    return (
      <View
        style={{
          ...styles(colors).registerContainer,
          ...globalStyles(colors).screen,
        }}>
        <Pressable onPress={biometricLoginHandler}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={60}
            color={colors.secondary}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        ...globalStyles(colors).form,
        justifyContent: "flex-start",
        paddingTop: 20,
      }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ ...globalStyles(colors).formText }}>
          {formatMessage({
            id: "Sign In",
            defaultMessage: "Zaloguj się",
          })}
        </Text>
      </View>
      <View style={globalStyles(colors).formContainer}>
        <Input
          placeholder={formatMessage({
            id: "Enter e-main",
            defaultMessage: "Podaj e-mail",
          })}
          label="E-mail"
          getData={onChangeHandler}
          autoCorrect={false}
          errorText={formatMessage({
            id: "Enter valid e-mail",
            defaultMessage: "Podaj poprawny e-mail",
          })}
          email
          autoCapitalize="none"
          id="email"
          required
        />
        <Input
          placeholder={formatMessage({
            id: "Enter password",
            defaultMessage: "Podaj hasło",
          })}
          secureTextEntry={true}
          label={formatMessage({ id: "Password", defaultMessage: "Hasło" })}
          errorText={formatMessage({
            id: "Enter valid password",
            defaultMessage: "Podaj poprawne hasło",
          })}
          required
          getData={onChangeHandler}
          id="password"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Pressable
        style={[
          globalStyles(colors).button,
          !state.formIsValid ? globalStyles(colors).buttonDisabled : null,
          { marginBottom: 20 },
        ]}
        disabled={!state.formIsValid}
        onPress={submitHandler}>
        <Text style={globalStyles(colors).buttonText}>
          {formatMessage({
            id: "Sign In",
            defaultMessage: "Zaloguj się",
          })}
        </Text>
      </Pressable>
      <View style={styles(colors).registerContainer}>
        <Text>
          {formatMessage({
            id: "You don't have account yet ?",
            defaultMessage: "Nie masz jeszcze konta?",
          })}
        </Text>
        <Pressable
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Register")}>
          <Text style={{ fontSize: 20 }}>
            {formatMessage({
              id: "Sign Up",
              defaultMessage: "Zarejestruj się",
            })}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const loginOptions = (
  _: NativeStackNavigationProp<AuthNavigationStackList, "Login", undefined>,
) => {
  const { formatMessage } = useIntl();
  return {
    title: formatMessage({
      id: "Login",
      defaultMessage: "Logowanie",
    }),
  };
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    registerContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      backgroundColor: colors.backgroundColor,
    },
  });

export default Login;

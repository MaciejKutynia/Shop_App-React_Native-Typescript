import React, { useCallback, useEffect, useReducer } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useIntl, FormattedMessage } from "react-intl";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

import Input from "../../utils/components/Input";

import globalStyles from "../../assets/styles/global";

import { signIn } from "../../redux/actions/Auth";

import { AnyAction } from "redux";
import { ThemeInterface } from "../../assets/Colors";
import { setLoading } from "../../redux/actions/Theme";
import { LoginScreenProps } from "../../types/navigation/Auth";

const loginReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case "LOGIN_USER":
      let formIsValid = true;
      const values = {
        ...state.values,
        [action.input]: action.value,
      };
      const validities = {
        ...state.validities,
        [action.input]: action.isValid,
      };
      for (const key in validities) {
        formIsValid = formIsValid && validities[key];
      }
      return {
        ...state,
        formIsValid,
        values,
        validities,
      };
    default:
      return state;
  }
};

const Login: React.FC<LoginScreenProps> = (props) => {
  const { navigation } = props;
  const appDispatch = useAppDispatch();

  const { formatMessage } = useIntl();

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  const [state, dispatch] = useReducer(loginReducer, {
    values: {
      email: "",
      password: "",
    },
    validities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

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

  return (
    <View
      style={{
        ...globalStyles(colors).form,
        justifyContent: "flex-start",
        marginTop: 20,
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

export const loginOptions = (navData) => {
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
      marginTop: 10,
    },
  });

export default Login;

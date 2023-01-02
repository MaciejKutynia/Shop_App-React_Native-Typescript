import React, { useCallback, useEffect, useReducer } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../../hooks/redux";
import { useIntl } from "react-intl";

import globalStyles from "../../../assets/styles/global";

import Input from "../../../utils/components/Input";
import Text from "../../../utils/components/Text";

import { ThemeInterface } from "../../../assets/Colors";
import { AnyAction } from "redux";
import { RegisterScreenProps } from "../../../types/navigation/Auth";

const registerReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case "FORM_UPDATE":
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

const Register: React.FC<RegisterScreenProps> = (props) => {
  const { navigation } = props;

  const { formatMessage } = useIntl();

  const colors: ThemeInterface = useAppSelector((state) => state.Theme.colors);

  useEffect(() => {}, []);

  const [state, dispatch] = useReducer(registerReducer, {
    values: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      postalCode: "",
    },
    validities: {
      email: false,
      password: false,
      firstname: false,
      lastname: false,
    },
    formIsValid: false,
  });

  const onChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatch({ type: "LOGIN_USER", value, isValid, input });
    },
    [dispatch],
  );

  return (
    <KeyboardAvoidingView
      style={globalStyles(colors).screen}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
      keyboardVerticalOffset={10}>
      <Text style={globalStyles(colors).formText}>
        {formatMessage({ id: "Sign Up", defaultMessage: "Zarejestruj się" })}
      </Text>
      <View style={{ justifyContent: "flex-start" }}>
        <View style={globalStyles(colors).formContainer}>
          <Input
            placeholder={formatMessage({
              id: "Enter e-mail",
              defaultMessage: "Podaj e-mail",
            })}
            label="E-mail"
            id="e-mail"
            required
            autoCorrect={false}
            autoCapitalize="none"
            email
            errorText={formatMessage({
              id: "Enter valid e-mail",
              defaultMessage: "Podaj poprawny e-mail",
            })}
            getData={onChangeHandler}
          />
          <Input
            secureTextEntry={true}
            placeholder={formatMessage({
              id: "Enter password",
              defaultMessage: "Podaj hasło",
            })}
            label={formatMessage({ id: "Password", defaultMessage: "Hasło" })}
            id="password"
            required
            autoCorrect={false}
            autoCapitalize="none"
            email
            errorText={formatMessage({
              id: "Enter valid password",
              defaultMessage: "Podaj poprawne hasło",
            })}
            getData={onChangeHandler}
          />
        </View>
        <View
          style={{
            ...globalStyles(colors).formContainer,
            ...styles(colors).personalData,
          }}>
          <Text
            style={{
              ...globalStyles(colors).formText,
              ...styles(colors).personalText,
            }}>
            {formatMessage({
              id: "Personal data",
              defaultMessage: "Dane użytkownika",
            })}
          </Text>
          <Input
            style={styles(colors).input}
            getData={onChangeHandler}
            label={formatMessage({ id: "Firstname", defaultMessage: "Imię" })}
            errorText={formatMessage({
              id: "Please enter firstname",
              defaultMessage: "Podaj imię",
            })}
            id="firstname"
          />
          <Input
            style={styles(colors).input}
            getData={onChangeHandler}
            label={formatMessage({
              id: "Lastname",
              defaultMessage: "Nazwisko",
            })}
            errorText={formatMessage({
              id: "Please enter lastname",
              defaultMessage: "Podaj nazwisko",
            })}
            id="lastname"
          />
          <Input
            style={styles(colors).input}
            getData={onChangeHandler}
            label={formatMessage({ id: "Address", defaultMessage: "Adres" })}
            id="address"
          />
          <Input
            style={styles(colors).input}
            getData={onChangeHandler}
            label={formatMessage({ id: "City", defaultMessage: "Miasto" })}
            id="city"
          />
          <Input
            style={styles(colors).input}
            getData={onChangeHandler}
            label={formatMessage({
              id: "Zip code",
              defaultMessage: "Kod pocztowy",
            })}
            id="postalCode"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = (colors: ThemeInterface) =>
  StyleSheet.create({
    personalData: {
      marginTop: 15,
      width: "100%",
      flexWrap: "wrap",
    },
    personalText: {
      width: "100%",
      textAlign: "center",
    },
    input: {
      width: Platform.OS === "ios" ? "39%" : "50%",
    },
  });

export default Register;

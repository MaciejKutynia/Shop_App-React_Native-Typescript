import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export interface AuthNavigationInterface extends NativeStackNavigationOptions {
  stackOptions: StackOptions;
}

export type AuthNavigationStackList = {
  Login: undefined;
  Register: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthNavigationStackList,
  "Login"
>;

export type RegisterScreenProps = NativeStackScreenProps<
  AuthNavigationStackList,
  "Register"
>;

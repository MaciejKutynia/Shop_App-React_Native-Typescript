import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export interface ShopNavigationInterface extends NativeStackNavigationOptions {
  stackOptions: StackOptions;
}

export type ShopNavigationStackList = {
  Home: undefined;
  Product: undefined;
};

export type ShopScreenProps = NativeStackScreenProps<
  ShopNavigationStackList,
  "Home"
>;
